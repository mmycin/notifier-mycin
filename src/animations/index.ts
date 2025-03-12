import type { NotifyAnimation, NotifyPosition } from '../core/types';
import { getFadeAnimation } from './fade';
import { getSlideAnimation } from './slide';
import { getBounceAnimation } from './bounce';

export const getAnimation = (
  animation: NotifyAnimation, 
  direction: 'in' | 'out', 
  position: NotifyPosition
) => {
  switch (animation) {
    case 'fade':
      return getFadeAnimation(direction);
    case 'slide':
      return getSlideAnimation(direction, position);
    case 'bounce':
      return getBounceAnimation(direction);
    case 'zoom':
      return {
        animation: `notifier-zoom-${direction} 0.3s ease`,
        keyframes: `
          @keyframes notifier-zoom-${direction} {
            from { transform: scale(${direction === 'in' ? 0.7 : 1}); opacity: ${direction === 'in' ? 0 : 1}; }
            to { transform: scale(${direction === 'in' ? 1 : 0.7}); opacity: ${direction === 'in' ? 1 : 0}; }
          }
        `
      };
    case 'flip':
      return {
        animation: `notifier-flip-${direction} 0.5s ease`,
        keyframes: `
          @keyframes notifier-flip-${direction} {
            from { transform: perspective(400px) rotate3d(1, 0, 0, ${direction === 'in' ? '90deg' : '0deg'}); opacity: ${direction === 'in' ? 0 : 1}; }
            to { transform: perspective(400px) rotate3d(1, 0, 0, ${direction === 'in' ? '0deg' : '90deg'}); opacity: ${direction === 'in' ? 1 : 0}; }
          }
        `
      };
    case 'none':
    default:
      return {
        animation: '',
        keyframes: ''
      };
  }
}; 