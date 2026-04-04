export const FORM_LAYOUTS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  INLINE: 'inline',
} as const;

export const FORM_LABEL_ALIGN = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export const DEFAULT_FORM_LAYOUT = FORM_LAYOUTS.VERTICAL;
export const DEFAULT_FORM_LABEL_ALIGN = FORM_LABEL_ALIGN.LEFT;
export const DEFAULT_FORM_LABEL_COL = 6;
export const DEFAULT_FORM_WRAPPER_COL = 18;
