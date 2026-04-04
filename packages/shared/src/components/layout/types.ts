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

export interface LayoutContextValue {
  hasSider: boolean;
}
