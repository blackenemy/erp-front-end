export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return '';
  
  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  return value;
}

export function isValidDateRange(from: string, to: string): boolean {
  if (!from || !to) return true;
  return new Date(from) <= new Date(to);
}

export function parseDate(value: string): Date | null {
  if (!value) return null;
  
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}
