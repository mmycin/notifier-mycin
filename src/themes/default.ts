import type { NotifyStyle, NotifyType } from '../core/types';
import { TYPE_COLORS } from '../core/constants';

export const getDefaultTheme = (type: NotifyType): NotifyStyle => {
  return {
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
    color: '#ffffff',
    backgroundColor: TYPE_COLORS[type]
  };
}; 