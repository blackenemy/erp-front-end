export const BADGE_VARIANTS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
} as const;

export const BADGE_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export const DEFAULT_BADGE_VARIANT = BADGE_VARIANTS.DEFAULT;
export const DEFAULT_BADGE_SIZE = BADGE_SIZES.MD;
export const DEFAULT_MAX_COUNT = 99;
