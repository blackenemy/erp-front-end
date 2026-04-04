export const TABLE_SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const TABLE_TEXT_ALIGN = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

export const DEFAULT_TABLE_SORT_DIRECTION = TABLE_SORT_DIRECTION.ASC;
export const DEFAULT_TABLE_TEXT_ALIGN = TABLE_TEXT_ALIGN.LEFT;
export const DEFAULT_TABLE_PAGE_SIZE = 10;
