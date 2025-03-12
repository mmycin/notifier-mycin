import { describe, test, expect } from 'bun:test';
import { getThemeStyles } from '../src/themes';
import { TYPE_COLORS } from '../src/core/constants';

describe('Themes', () => {
  test('should return default theme styles', () => {
    const styles = getThemeStyles('default', 'success');
    
    expect(styles).toBeDefined();
    expect(styles.backgroundColor).toBe(TYPE_COLORS.success);
    expect(styles.borderRadius).toBe('8px');
  });

  test('should return minimal theme styles', () => {
    const styles = getThemeStyles('minimal', 'error');
    
    expect(styles).toBeDefined();
    expect(styles.border).toContain(TYPE_COLORS.error);
    expect(styles.backgroundColor).toBe('#ffffff');
  });

  test('should return material theme styles', () => {
    const styles = getThemeStyles('material', 'warning');
    
    expect(styles).toBeDefined();
    expect(styles.backgroundColor).toBe(TYPE_COLORS.warning);
    expect(styles.fontFamily).toContain('Roboto');
  });

  test('should return dark theme styles', () => {
    const styles = getThemeStyles('dark', 'info');
    
    expect(styles).toBeDefined();
    expect(styles.backgroundColor).toBe('#333');
    expect(styles.color).toBe('#fff');
  });

  test('should return light theme styles', () => {
    const styles = getThemeStyles('light', 'custom');
    
    expect(styles).toBeDefined();
    expect(styles.backgroundColor).toBe('#f8f9fa');
    expect(styles.color).toBe('#333');
  });
}); 