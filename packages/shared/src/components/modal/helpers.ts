import { MODAL_SIZES } from './constants';

export const isValidModalSize = (
  size: string
): size is keyof typeof MODAL_SIZES => {
  return Object.values(MODAL_SIZES).includes(size as any);
};

export const preventBodyScroll = (prevent: boolean): void => {
  if (prevent) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
};

export const handleEscapeKey = (
  e: KeyboardEvent,
  onClose: () => void
): void => {
  if (e.key === 'Escape') {
    onClose();
  }
};
