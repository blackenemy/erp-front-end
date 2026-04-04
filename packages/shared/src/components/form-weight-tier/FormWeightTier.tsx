"use client";

import { memo, useCallback } from "react";
import { ChangeEvent } from "react";

import styles from "./FormWeightTier.module.css";
import { EMPTY_TIER } from "./constants";

import type { FormWeightTierProps } from "./types";

function FormWeightTier({
  tiers,
  onChange,
  label = "ช่วงราคาตามน้ำหนัก (Tiers)",
  id,
  disabled = false,
  className,
  ...rest
}: FormWeightTierProps) {
  const handleAddTier = useCallback(() => {
    onChange([...tiers, { ...EMPTY_TIER }]);
  }, [tiers, onChange]);

  const handleRemoveTier = useCallback(
    (index: number) => {
      const newTiers = tiers.filter((_, i) => i !== index);
      onChange(newTiers);
    },
    [tiers, onChange]
  );

  const handleUpdateTier = useCallback(
    (index: number, field: keyof (typeof tiers)[0], value: number) => {
      const newTiers = tiers.map((tier, i) =>
        i === index ? { ...tier, [field]: value } : tier
      );
      onChange(newTiers);
    },
    [tiers, onChange]
  );

  const handleInputChange = useCallback(
    (index: number, field: keyof (typeof tiers)[0]) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        handleUpdateTier(index, field, Number(e.target.value));
      };
    },
    [handleUpdateTier]
  );

  if (tiers.length === 0) {
    return (
      <div
        className={`${styles.root}${className ? ` ${className}` : ""}`}
        {...rest}
      >
        <div className={styles.header}>
          <h4>{label}</h4>
        </div>
        <button
          type="button"
          onClick={handleAddTier}
          disabled={disabled}
          className={`${styles.addButton} ${styles.button} ${styles.buttonSecondary}`}
        >
          เพิ่มช่วง
        </button>
      </div>
    );
  }

  return (
    <div
      className={`${styles.root}${className ? ` ${className}` : ""}`}
      id={id}
      {...rest}
    >
      <div className={styles.header}>
        <h4>{label}</h4>
      </div>
      <div className={styles.tiersContainer}>
        {tiers.map((tier, index) => (
          <div key={index} className={styles.tierRow}>
            <div className={styles.field}>
              <label htmlFor={`tier-${index}-min`} className={styles.label}>
                น้ำหนักขั้นต่ำ (kg)
              </label>
              <input
                id={`tier-${index}-min`}
                type="number"
                value={tier.minKg || ""}
                onChange={handleInputChange(index, "minKg")}
                placeholder="0"
                disabled={disabled}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor={`tier-${index}-max`} className={styles.label}>
                น้ำหนักสูงสุด (kg)
              </label>
              <input
                id={`tier-${index}-max`}
                type="number"
                value={tier.maxKg || ""}
                onChange={handleInputChange(index, "maxKg")}
                placeholder="0"
                disabled={disabled}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor={`tier-${index}-price`} className={styles.label}>
                ราคาต่อกิโลกรัม (฿)
              </label>
              <input
                id={`tier-${index}-price`}
                type="number"
                value={tier.pricePerKg || ""}
                onChange={handleInputChange(index, "pricePerKg")}
                placeholder="0"
                disabled={disabled}
                className={styles.input}
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveTier(index)}
              disabled={disabled}
              className={`${styles.button} ${styles.buttonDanger}`}
            >
              ลบ
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAddTier}
        disabled={disabled}
        className={`${styles.addButton} ${styles.button} ${styles.buttonSecondary}`}
      >
        เพิ่มช่วง
      </button>
    </div>
  );
}

export default memo(FormWeightTier);
