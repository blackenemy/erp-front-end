export const INPUT_VARIANTS = {
  DEFAULT: 'default',
  OUTLINED: 'outlined',
  FILLED: 'filled',
} as const;

export const DEFAULT_INPUT_VARIANT = INPUT_VARIANTS.DEFAULT;

export const INPUT_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEL: 'tel',
  URL: 'url',
} as const;
