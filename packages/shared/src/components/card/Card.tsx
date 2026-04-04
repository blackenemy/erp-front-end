import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Card = ({
  title,
  description,
  image,
  imageAlt,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  children,
  onClick,
  className,
}: CardProps) => {
  return (
    <article
      className={`${styles.card} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${onClick ? styles.clickable : ''} ${className || ''}`}
      onClick={onClick}
    >
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} alt={imageAlt || title || 'Card image'} className={styles.image} />
        </div>
      )}
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && <p className={styles.description}>{description}</p>}
        {children && <div className={styles.children}>{children}</div>}
      </div>
    </article>
  );
};
