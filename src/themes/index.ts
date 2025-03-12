import type { NotifyStyle, NotifyTheme, NotifyType } from '../core/types';
import { getDefaultTheme } from './default';
import { getMinimalTheme } from './minimal';
import { getMaterialTheme } from './material';

export const getThemeStyles = (theme: NotifyTheme, type: NotifyType): NotifyStyle => {
  switch (theme) {
    case 'minimal':
      return getMinimalTheme(type);
    case 'material':
      return getMaterialTheme(type);
    case 'dark':
      return {
        ...getDefaultTheme(type),
        backgroundColor: '#333',
        color: '#fff'
      };
    case 'light':
      return {
        ...getDefaultTheme(type),
        backgroundColor: '#f8f9fa',
        color: '#333'
      };
    case 'default':
    default:
      return getDefaultTheme(type);
  }
}; 