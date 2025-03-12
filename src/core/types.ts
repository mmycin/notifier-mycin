export type NotifyType = 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info' 
  | 'custom';

export type NotifyPosition = {
  x: 'left' | 'center' | 'right';
  y: 'top' | 'center' | 'bottom';
};

export type NotifyAnimation = 
  | 'fade' 
  | 'slide' 
  | 'bounce' 
  | 'zoom' 
  | 'flip' 
  | 'none';

export type NotifyTheme = 
  | 'default' 
  | 'minimal' 
  | 'material' 
  | 'dark' 
  | 'light' 
  | 'custom';

export interface NotifyStyle {
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  fontFamily?: string;
  boxShadow?: string;
  border?: string;
  color?: string;
  backgroundColor?: string;
  [key: string]: string | undefined;
}

export interface NotifyOptions {
  message: string;
  duration?: number;
  type?: NotifyType;
  position?: NotifyPosition;
  animation?: NotifyAnimation;
  theme?: NotifyTheme;
  onClick?: () => void;
  onClose?: () => void;
  onHover?: () => void;
  closeButton?: boolean;
  progressBar?: boolean;
  pauseOnHover?: boolean;
  escapeHtml?: boolean;
  icon?: string | boolean;
  style?: NotifyStyle;
  className?: string;
  customContent?: HTMLElement;
  stack?: boolean;
  maxToasts?: number;
  zIndex?: number;
  rtl?: boolean;
  id?: string;
}

export interface NotifyInstance {
  showToast: () => void;
  hideToast: () => void;
  updateToast: (options: Partial<NotifyOptions>) => void;
  id: string;
}

export interface NotifyQueueItem {
  options: NotifyOptions;
  instance?: NotifyInstance;
}

export interface NotifyManager {
  show: (options: NotifyOptions | string) => NotifyInstance;
  success: (message: string, options?: Partial<NotifyOptions>) => NotifyInstance;
  error: (message: string, options?: Partial<NotifyOptions>) => NotifyInstance;
  warning: (message: string, options?: Partial<NotifyOptions>) => NotifyInstance;
  info: (message: string, options?: Partial<NotifyOptions>) => NotifyInstance;
  custom: (options: NotifyOptions) => NotifyInstance;
  dismiss: (id?: string) => void;
  dismissAll: () => void;
  update: (id: string, options: Partial<NotifyOptions>) => void;
  isActive: (id: string) => boolean;
  getActive: () => string[];
  setDefaults: (options: Partial<NotifyOptions>) => void;
  getDefaults: () => Partial<NotifyOptions>;
} 