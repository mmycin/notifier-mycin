import type { NotifyOptions, NotifyStyle } from '../core/types';
import { DEFAULT_OPTIONS } from '../core/constants';

export const generateId = (): string => {
  return 'notifier-' + Math.random().toString(36).substring(2, 9);
};

export const mergeOptions = (
  options: NotifyOptions | string,
  defaults: Partial<NotifyOptions> = DEFAULT_OPTIONS
): NotifyOptions => {
  if (typeof options === 'string') {
    return { ...defaults, message: options } as NotifyOptions;
  }
  
  return { ...defaults, ...options } as NotifyOptions;
};

export const mergeStyles = (baseStyle: NotifyStyle, customStyle?: NotifyStyle): NotifyStyle => {
  if (!customStyle) return baseStyle;
  return { ...baseStyle, ...customStyle };
};

export const limitToasts = (
  container: HTMLElement,
  maxToasts: number
): void => {
  // Check if querySelectorAll is available (for test environments)
  if (!container || typeof container.querySelectorAll !== 'function') {
    return; // Skip limiting in test environment
  }
  
  const toasts = Array.from(container.querySelectorAll('.notifier-mycin-toast'));
  
  if (toasts.length > maxToasts) {
    for (let i = 0; i < toasts.length - maxToasts; i++) {
      const toast = toasts[i];
      if (toast) {
        container.removeChild(toast);
      }
    }
  }
}; 