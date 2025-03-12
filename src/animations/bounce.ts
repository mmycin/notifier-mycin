export const bounceIn = `
  @keyframes notifier-bounce-in {
    0%, 20%, 40%, 60%, 80%, 100% {
      transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }
    20% {
      transform: scale3d(1.1, 1.1, 1.1);
    }
    40% {
      transform: scale3d(.9, .9, .9);
    }
    60% {
      opacity: 1;
      transform: scale3d(1.03, 1.03, 1.03);
    }
    80% {
      transform: scale3d(.97, .97, .97);
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }
`;

export const bounceOut = `
  @keyframes notifier-bounce-out {
    20% {
      transform: scale3d(.9, .9, .9);
    }
    50%, 55% {
      opacity: 1;
      transform: scale3d(1.1, 1.1, 1.1);
    }
    100% {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }
  }
`;

export const getBounceAnimation = (direction: 'in' | 'out') => {
  return {
    animation: `notifier-bounce-${direction} 0.6s ease`,
    keyframes: direction === 'in' ? bounceIn : bounceOut
  };
}; 