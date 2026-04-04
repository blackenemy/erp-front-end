import { INPUT_VARIANTS } from './constants';

export const isValidInputVariant = (
  variant: string
): variant is keyof typeof INPUT_VARIANTS => {
  return Object.values(INPUT_VARIANTS).includes(variant as any);
};

export const generateInputId = (): string => {
  return `input-${Math.random().toString(36).substr(2, 9)}`;
};

export const getErrorMessage = (
  error: string | undefined,
  helperText: string | undefined
): string | undefined => {
  return error || (helperText && !error) ? helperText : undefined;
};
