export const fadeIn = `
  @keyframes notifier-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const fadeOut = `
  @keyframes notifier-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

export const getFadeAnimation = (direction: 'in' | 'out') => {
  return {
    animation: `notifier-fade-${direction} 0.3s ease`,
    keyframes: direction === 'in' ? fadeIn : fadeOut
  };
}; 