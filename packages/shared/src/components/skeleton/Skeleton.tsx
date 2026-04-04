import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

export const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  count = 1,
  className,
}: SkeletonProps) => {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${styles.skeleton} ${styles[variant]} ${className || ''}`}
      style={{ width, height }}
      role="status"
      aria-label="Loading..."
    >
      <span className={styles.visuallyHidden}>Loading...</span>
    </div>
  ));

  return count > 1 ? (
    <div className={styles.container}>{skeletons}</div>
  ) : (
    skeletons[0]
  );
};
