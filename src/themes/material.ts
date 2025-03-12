import type { NotifyStyle, NotifyType } from '../core/types';
import { TYPE_COLORS } from '../core/constants';

export const getMaterialTheme = (type: NotifyType): NotifyStyle => {
  return {
    borderRadius: '4px',
    padding: '16px 24px',
    fontSize: '14px',
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
    boxShadow: '0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)',
    color: '#ffffff',
    backgroundColor: TYPE_COLORS[type]
  };
}; 