import { CONTAINER_CLASS } from '../core/constants';
import type { NotifyPosition } from '../core/types';

export const createStyleSheet = (id: string, css: string): HTMLStyleElement => {
  const existingStyle = document.getElementById(id) as HTMLStyleElement;
  
  if (existingStyle) {
    return existingStyle;
  }
  
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  
  style.id = id;
  style.type = 'text/css';
  
  // Try to use createTextNode, but fall back to setting textContent directly
  try {
    if (typeof document.createTextNode === 'function') {
      style.appendChild(document.createTextNode(css));
    } else {
      // For test environments or older browsers
      style.textContent = css;
    }
  } catch (e) {
    // Fallback if any errors occur
    style.textContent = css;
  }
  
  head.appendChild(style);
  return style;
};

export const getContainer = (position: NotifyPosition, rtl: boolean = false): HTMLElement => {
  const containerId = `${CONTAINER_CLASS}-${position.x}-${position.y}`;
  let container = document.getElementById(containerId);
  
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = CONTAINER_CLASS;
    
    const style: Partial<CSSStyleDeclaration> = {
      position: 'fixed',
      zIndex: '9999',
      pointerEvents: 'none',
      direction: rtl ? 'rtl' : 'ltr'
    };
    
    // Set position
    if (position.x === 'left') {
      style.left = '20px';
    } else if (position.x === 'right') {
      style.right = '20px';
    } else if (position.x === 'center') {
      style.left = '50%';
      style.transform = 'translateX(-50%)';
    }
    
    if (position.y === 'top') {
      style.top = '20px';
    } else if (position.y === 'bottom') {
      style.bottom = '20px';
    } else if (position.y === 'center') {
      style.top = '50%';
      style.transform = (style.transform || '') + ' translateY(-50%)';
    }
    
    // Apply styles
    Object.assign(container.style, style);
    
    document.body.appendChild(container);
  }
  
  return container;
};

export const escapeHtml = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}; 