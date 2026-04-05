export interface ComboboxProps<T = string> {
  value: T[];
  onChange: (value: T[]) => void;
  options: T[];
  placeholder?: string;
  label?: string;
  displayValue?: (item: T) => string;
  tags?: (item: T) => string;
  onInputChange?: (value: string) => void;
  isLoading?: boolean;
  maxVisibleItems?: number;
  searchable?: boolean;
  maxTags?: number;
}
