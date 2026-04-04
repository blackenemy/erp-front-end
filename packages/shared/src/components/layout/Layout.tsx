import React from 'react';
import styles from './Layout.module.css';

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface LayoutSiderProps {
  children: React.ReactNode;
  width?: string | number;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface LayoutHeaderProps {
  children: React.ReactNode;
  fixed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface LayoutContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface LayoutFooterProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const LayoutContext = React.createContext<{
  hasSider: boolean;
}>({ hasSider: false });

export function Layout({ children, className, style }: LayoutProps) {
  const hasSider = React.useMemo(() => {
    return React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.type === Layout.Sider
    );
  }, [children]);

  return (
    <LayoutContext.Provider value={{ hasSider }}>
      <div
        className={`${styles.layout} ${hasSider ? styles.hasSider : ''} ${className || ''}`}
        style={style}
      >
        {children}
      </div>
    </LayoutContext.Provider>
  );
}

Layout.Sider = function LayoutSider({
  children,
  width = 256,
  collapsible = false,
  collapsed = false,
  onCollapse,
  className,
  style,
}: LayoutSiderProps) {
  const context = React.useContext(LayoutContext);

  return (
    <div
      className={`${styles.sider} ${collapsed ? styles.collapsed : ''} ${className || ''}`}
      style={{
        width: collapsed ? 80 : typeof width === 'number' ? `${width}px` : width,
        ...style,
      }}
    >
      {children}
      {collapsible && (
        <button
          className={styles.collapseButton}
          onClick={() => onCollapse?.(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      )}
    </div>
  );
};

Layout.Header = function LayoutHeader({
  children,
  fixed = false,
  className,
  style,
}: LayoutHeaderProps) {
  return (
    <div
      className={`${styles.header} ${fixed ? styles.fixed : ''} ${className || ''}`}
      style={style}
    >
      {children}
    </div>
  );
};

Layout.Content = function LayoutContent({
  children,
  className,
  style,
}: LayoutContentProps) {
  return (
    <main className={`${styles.content} ${className || ''}`} style={style}>
      {children}
    </main>
  );
};

Layout.Footer = function LayoutFooter({
  children,
  className,
  style,
}: LayoutFooterProps) {
  return (
    <footer className={`${styles.footer} ${className || ''}`} style={style}>
      {children}
    </footer>
  );
};
