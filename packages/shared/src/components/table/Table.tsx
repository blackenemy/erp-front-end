import React from 'react';
import styles from './Table.module.css';

export interface Column<T> {
  key: keyof T | string;
  title: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey?: keyof T | ((record: T) => string);
  loading?: boolean;
  empty?: React.ReactNode;
  onRowClick?: (record: T, index: number) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  className?: string;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  rowKey = 'id',
  loading = false,
  empty = <div className={styles.empty}>No data available</div>,
  onRowClick,
  onSort,
  pagination,
  className,
}: TableProps<T>) {
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return String(record[rowKey] || index);
  };

  const renderCell = (column: Column<T>, record: T, index: number) => {
    const value = record[column.key as keyof T];
    return column.render ? column.render(value, record, index) : value;
  };

  const handleSort = (column: Column<T>) => {
    if (column.sortable && onSort) {
      const direction = column.key === 'title' ? 'asc' : 'desc';
      onSort(String(column.key), direction);
    }
  };

  if (loading) {
    return (
      <div className={`${styles.container} ${className || ''}`}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`${styles.container} ${className || ''}`}>
        {empty}
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`${styles.th} ${column.sortable ? styles.sortable : ''} ${styles[column.align || 'left']}`}
                style={{ width: column.width }}
                onClick={() => handleSort(column)}
              >
                {column.title}
                {column.sortable && <span className={styles.sortIcon}>↕</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr
              key={getRowKey(record, index)}
              className={onRowClick ? styles.clickableRow : ''}
              onClick={() => onRowClick?.(record, index)}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={`${styles.td} ${styles[column.align || 'left']}`}
                >
                  {renderCell(column, record, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing {((pagination.current - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} of {pagination.total}
          </span>
          <div className={styles.paginationControls}>
            <button
              onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
              disabled={pagination.current === 1}
              className={styles.paginationButton}
            >
              Previous
            </button>
            <span className={styles.pageNumber}>{pagination.current}</span>
            <button
              onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
              disabled={pagination.current * pagination.pageSize >= pagination.total}
              className={styles.paginationButton}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
