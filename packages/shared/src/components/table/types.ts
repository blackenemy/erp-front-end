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

export interface TableSortDirection {
  asc: 'asc';
  desc: 'desc';
}

export interface TableTextAlign {
  left: 'left';
  center: 'center';
  right: 'right';
}
