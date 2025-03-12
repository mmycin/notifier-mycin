import type { NotifyOptions, NotifyPosition } from './types';

export const DEFAULT_DURATION = 3000;
export const DEFAULT_TYPE = 'success';
export const DEFAULT_POSITION: NotifyPosition = { x: 'right', y: 'bottom' };
export const DEFAULT_ANIMATION = 'fade';
export const DEFAULT_THEME = 'default';
export const DEFAULT_Z_INDEX = 9999;
export const DEFAULT_MAX_TOASTS = 5;

export const TYPE_COLORS = {
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  custom: '#6c757d'
};

export const DEFAULT_OPTIONS: Partial<NotifyOptions> = {
  duration: DEFAULT_DURATION,
  type: DEFAULT_TYPE,
  position: DEFAULT_POSITION,
  animation: DEFAULT_ANIMATION,
  theme: DEFAULT_THEME,
  closeButton: true,
  progressBar: true,
  pauseOnHover: true,
  escapeHtml: true,
  icon: true,
  stack: true,
  maxToasts: DEFAULT_MAX_TOASTS,
  zIndex: DEFAULT_Z_INDEX,
  rtl: false
};

export const CONTAINER_CLASS = 'notifier-mycin-container';
export const TOAST_CLASS = 'notifier-mycin-toast';
export const PROGRESS_CLASS = 'notifier-mycin-progress';
export const CLOSE_BUTTON_CLASS = 'notifier-mycin-close';
export const ICON_CLASS = 'notifier-mycin-icon'; 