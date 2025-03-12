export const slideInRight = `
  @keyframes notifier-slide-in-right {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

export const slideOutRight = `
  @keyframes notifier-slide-out-right {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
`;

export const slideInLeft = `
  @keyframes notifier-slide-in-left {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
`;

export const slideOutLeft = `
  @keyframes notifier-slide-out-left {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }
`;

export const slideInTop = `
  @keyframes notifier-slide-in-top {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
`;

export const slideOutTop = `
  @keyframes notifier-slide-out-top {
    from { transform: translateY(0); }
    to { transform: translateY(-100%); }
  }
`;

export const slideInBottom = `
  @keyframes notifier-slide-in-bottom {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
`;

export const slideOutBottom = `
  @keyframes notifier-slide-out-bottom {
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
  }
`;

export const getSlideAnimation = (direction: 'in' | 'out', position: { x: string, y: string }) => {
  let animationName;
  
  if (position.x === 'right') {
    animationName = direction === 'in' ? 'notifier-slide-in-right' : 'notifier-slide-out-right';
  } else if (position.x === 'left') {
    animationName = direction === 'in' ? 'notifier-slide-in-left' : 'notifier-slide-out-left';
  } else if (position.y === 'top') {
    animationName = direction === 'in' ? 'notifier-slide-in-top' : 'notifier-slide-out-top';
  } else {
    animationName = direction === 'in' ? 'notifier-slide-in-bottom' : 'notifier-slide-out-bottom';
  }
  
  return {
    animation: `${animationName} 0.4s ease`,
    keyframes: getKeyframesForSlide(position, direction)
  };
};

function getKeyframesForSlide(position: { x: string, y: string }, direction: 'in' | 'out') {
  if (position.x === 'right') {
    return direction === 'in' ? slideInRight : slideOutRight;
  } else if (position.x === 'left') {
    return direction === 'in' ? slideInLeft : slideOutLeft;
  } else if (position.y === 'top') {
    return direction === 'in' ? slideInTop : slideOutTop;
  } else {
    return direction === 'in' ? slideInBottom : slideOutBottom;
  }
} 