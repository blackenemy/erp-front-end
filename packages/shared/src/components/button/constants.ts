export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  DANGER: 'danger',
} as const;

export const BUTTON_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export const DEFAULT_BUTTON_VARIANT = BUTTON_VARIANTS.PRIMARY;
export const DEFAULT_BUTTON_SIZE = BUTTON_SIZES.MD;
