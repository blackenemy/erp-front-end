import { LAYOUT_BREAKPOINTS } from './constants';

export const formatSiderWidth = (width: string | number): string => {
  if (typeof width === 'number') {
    return `${width}px`;
  }
  return width;
};

export const getCurrentBreakpoint = (): keyof typeof LAYOUT_BREAKPOINTS => {
  const width = window.innerWidth;

  if (width < LAYOUT_BREAKPOINTS.XS) return 'XXL';
  if (width < LAYOUT_BREAKPOINTS.SM) return 'XS';
  if (width < LAYOUT_BREAKPOINTS.MD) return 'SM';
  if (width < LAYOUT_BREAKPOINTS.LG) return 'MD';
  if (width < LAYOUT_BREAKPOINTS.XL) return 'LG';
  if (width < LAYOUT_BREAKPOINTS.XXL) return 'XL';
  return 'XXL';
};

export const shouldCollapseOnBreakpoint = (
  currentBreakpoint: keyof typeof LAYOUT_BREAKPOINTS,
  collapseBreakpoint: keyof typeof LAYOUT_BREAKPOINTS
): boolean => {
  const breakpointValues = Object.values(LAYOUT_BREAKPOINTS);
  const currentValue = breakpointValues.indexOf(LAYOUT_BREAKPOINTS[currentBreakpoint]);
  const collapseValue = breakpointValues.indexOf(LAYOUT_BREAKPOINTS[collapseBreakpoint]);

  return currentValue < collapseValue;
};

export const isMobile = (): boolean => {
  return window.innerWidth < LAYOUT_BREAKPOINTS.MD;
};

export const isTablet = (): boolean => {
  const width = window.innerWidth;
  return width >= LAYOUT_BREAKPOINTS.MD && width < LAYOUT_BREAKPOINTS.LG;
};

export const isDesktop = (): boolean => {
  return window.innerWidth >= LAYOUT_BREAKPOINTS.LG;
};
