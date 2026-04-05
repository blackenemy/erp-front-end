"use client";
import { useState, useRef, useEffect } from "react";
import type { ComboboxProps } from "./types";
import styles from "./Combobox.module.css";

export default function Combobox<T = string>({
  value,
  onChange,
  options,
  placeholder = "เลือก...",
  label,
  displayValue,
  tags,
  onInputChange,
  isLoading = false,
  maxVisibleItems = 10,
  searchable = true,
  maxTags = 5,
}: ComboboxProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const getDisplayValue = (item: T): string => {
    return displayValue ? displayValue(item) : (item as string);
  };

  const getTag = (item: T): string => {
    return tags ? tags(item) : "";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = options.filter((option) =>
        getDisplayValue(option).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options.slice(0, maxVisibleItems));
    }
  }, [searchTerm, options, maxVisibleItems]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  const handleSelectAll = () => {
    const allSelected = filteredOptions.every((option) => value.includes(option));
    if (allSelected) {
      const newValues = value.filter((v) => !filteredOptions.includes(v));
      onChange(newValues);
    } else {
      const newValues = Array.from(new Set([...value, ...filteredOptions]));
      onChange(newValues);
    }
  };

  const handleOptionToggle = (option: T) => {
    const newValue = value.includes(option)
      ? value.filter((v) => v !== option)
      : [...value, option];
    onChange(newValue);
    onInputChange?.(getDisplayValue(option));
  };

  const isSelected = (option: T): boolean => {
    return value.includes(option);
  };

  const allSelected =
    filteredOptions.length > 0 &&
    filteredOptions.every((option) => value.includes(option));

  const someSelected = filteredOptions.some((option) =>
    value.includes(option)
  );

  const visibleTags = value.slice(0, maxTags);
  const hiddenTagsCount = value.length - maxTags;

  return (
    <div className={styles.combobox} ref={containerRef}>
      {label && <div style={{ marginBottom: "0.5rem", fontWeight: "600" }}>{label}</div>}
      <div
        className={styles.comboboxTrigger}
        onClick={handleToggle}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div style={{ display: "flex", alignItems: "flex-start", flex: 1, flexWrap: "wrap", gap: "0.25rem" }}>
          {value.length > 0 ? (
            <>
              {visibleTags.map((item, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "#e2e8f0",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                  }}
                >
                  {getTag(item) && (
                    <span
                      style={{
                        backgroundColor: "#3182ce",
                        color: "white",
                        padding: "0.125rem 0.375rem",
                        borderRadius: "2px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {getTag(item)}
                    </span>
                  )}
                  <span>{getDisplayValue(item)}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionToggle(item);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#718096",
                      cursor: "pointer",
                      fontSize: "1rem",
                      lineHeight: "1",
                      padding: "0",
                      marginLeft: "0.25rem",
                    }}
                    title="เอาออก"
                  >
                    ×
                  </button>
                </span>
              ))}
              {hiddenTagsCount > 0 && (
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "#e2e8f0",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    color: "#718096",
                  }}
                >
                  +{hiddenTagsCount}
                </span>
              )}
            </>
          ) : (
            <span className={styles.comboboxPlaceholder}>{placeholder}</span>
          )}
        </div>
        <span
          className={`${styles.comboboxArrow} ${isOpen ? styles.open : ""}`}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {searchable && (
            <input
              type="text"
              className={styles.searchInput}
              placeholder="ค้นหารหัสไปรษณีย์..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          )}
          
          <div className={styles.selectAll}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className={styles.optionCheckbox}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = someSelected && !allSelected;
                  }
                }}
              />
              <span>
                {allSelected ? "ยกเลิกการเลือกทั้งหมด" : "เลือกทั้งหมด"}
              </span>
            </label>
            <span className={styles.selectedCount}>{value.length}</span>
          </div>

          <div className={styles.optionsList} role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className={styles.option}
                  onClick={() => handleOptionToggle(option)}
                  role="option"
                  aria-selected={isSelected(option)}
                >
                  <input
                    type="checkbox"
                    checked={isSelected(option)}
                    onChange={() => handleOptionToggle(option)}
                    className={styles.optionCheckbox}
                  />
                  <span className={styles.optionLabel}>
                    {getTag(option) && (
                      <span
                        style={{
                          display: "inline-block",
                          backgroundColor: "#3182ce",
                          color: "white",
                          padding: "0.125rem 0.375rem",
                          borderRadius: "2px",
                          fontSize: "0.75rem",
                          marginRight: "0.5rem",
                        }}
                      >
                        {getTag(option)}
                      </span>
                    )}
                    {getDisplayValue(option)}
                  </span>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>ไม่พบข้อมูล</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
