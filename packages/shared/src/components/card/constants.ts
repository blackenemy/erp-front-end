export const CARD_VARIANTS = {
  DEFAULT: 'default',
  OUTLINED: 'outlined',
  ELEVATED: 'elevated',
  FLAT: 'flat',
} as const;

export const CARD_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export const DEFAULT_CARD_VARIANT = CARD_VARIANTS.DEFAULT;
export const DEFAULT_CARD_SIZE = CARD_SIZES.MD;
