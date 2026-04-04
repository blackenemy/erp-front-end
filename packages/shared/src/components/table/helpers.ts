import { TABLE_SORT_DIRECTION, TABLE_TEXT_ALIGN } from './constants';

export const isValidTableSortDirection = (
  direction: string
): direction is keyof typeof TABLE_SORT_DIRECTION => {
  return Object.values(TABLE_SORT_DIRECTION).includes(direction as any);
};

export const isValidTableTextAlign = (
  align: string
): align is keyof typeof TABLE_TEXT_ALIGN => {
  return Object.values(TABLE_TEXT_ALIGN).includes(align as any);
};

export const getRowKey = <T extends Record<string, any>>(
  record: T,
  index: number,
  rowKey?: keyof T | ((record: T) => string)
): string => {
  if (typeof rowKey === 'function') {
    return rowKey(record);
  }
  if (rowKey) {
    return String(record[rowKey] || index);
  }
  return String(index);
};

export const sortData = <T extends Record<string, any>>(
  data: T[],
  key: string,
  direction: 'asc' | 'desc'
): T[] => {
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === bValue) return 0;

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    return direction === 'asc' ? 1 : -1;
  });
};

export const paginateData = <T extends Record<string, any>>(
  data: T[],
  current: number,
  pageSize: number
): T[] => {
  const start = (current - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
};

export const getPaginationInfo = (
  current: number,
  pageSize: number,
  total: number
): { start: number; end: number } => {
  const start = (current - 1) * pageSize + 1;
  const end = Math.min(current * pageSize, total);
  return { start, end };
};
