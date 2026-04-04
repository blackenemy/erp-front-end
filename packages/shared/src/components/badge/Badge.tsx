import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  count?: number;
  maxCount?: number;
  className?: string;
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  count,
  maxCount = 99,
  className,
}: BadgeProps) => {
  const displayCount = count !== undefined && count > maxCount ? `${maxCount}+` : count;

  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className || ''}`}>
      {children}
      {dot && <span className={styles.dot} />}
      {count !== undefined && <span className={styles.count}>{displayCount}</span>}
    </span>
  );
};
