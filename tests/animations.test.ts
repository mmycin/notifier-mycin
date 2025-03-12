import { describe, test, expect } from 'bun:test';
import { getAnimation } from '../src/animations';

describe('Animations', () => {
  test('should return fade animation', () => {
    const animation = getAnimation('fade', 'in', { x: 'right', y: 'bottom' });
    
    expect(animation).toBeDefined();
    expect(animation.animation).toContain('notifier-fade-in');
    expect(animation.keyframes).toContain('@keyframes notifier-fade-in');
  });

  test('should return slide animation for right position', () => {
    const animation = getAnimation('slide', 'in', { x: 'right', y: 'bottom' });
    
    expect(animation).toBeDefined();
    expect(animation.animation).toContain('notifier-slide-in-right');
    expect(animation.keyframes).toContain('@keyframes notifier-slide-in-right');
  });

  test('should return slide animation for left position', () => {
    const animation = getAnimation('slide', 'in', { x: 'left', y: 'bottom' });
    
    expect(animation).toBeDefined();
    expect(animation.animation).toContain('notifier-slide-in-left');
    expect(animation.keyframes).toContain('@keyframes notifier-slide-in-left');
  });

  test('should return bounce animation', () => {
    const animation = getAnimation('bounce', 'in', { x: 'right', y: 'bottom' });
    
    expect(animation).toBeDefined();
    expect(animation.animation).toContain('notifier-bounce-in');
    expect(animation.keyframes).toContain('@keyframes notifier-bounce-in');
  });

  test('should return zoom animation', () => {
    const animation = getAnimation('zoom', 'in', { x: 'right', y: 'bottom' });
    
    expect(animation).toBeDefined();
    expect(animation.animation).toContain('notifier-zoom-in');
    expect(animation.keyframes).toContain('@keyframes notifier-zoom-in');
  });

  test('should return flip animation', () => {
    const animation = getAnimation('flip', 'in', { x: 'right', y: 'bottom' });
    
    expect(animation).toBeDefined();
    expect(animation.animation).toContain('notifier-flip-in');
    expect(animation.keyframes).toContain('@keyframes notifier-flip-in');
  });

  test('should return empty animation for none type', () => {
    const animation = getAnimation('none', 'in', { x: 'right', y: 'bottom' });
    
    expect(animation).toBeDefined();
    expect(animation.animation).toBe('');
    expect(animation.keyframes).toBe('');
  });
}); 