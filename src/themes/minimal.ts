import type { NotifyStyle, NotifyType } from '../core/types';
import { TYPE_COLORS } from '../core/constants';

export const getMinimalTheme = (type: NotifyType): NotifyStyle => {
  return {
    borderRadius: '4px',
    padding: '10px 16px',
    fontSize: '13px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    boxShadow: 'none',
    border: `1px solid ${TYPE_COLORS[type]}`,
    color: '#333333',
    backgroundColor: '#ffffff'
  };
}; 