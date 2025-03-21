import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import type { 
  NotifyOptions, 
  NotifyInstance, 
  NotifyManager,
  NotifyQueueItem
} from './types';
import { DEFAULT_OPTIONS, TYPE_COLORS } from './constants';
import { getThemeStyles } from '../themes';
import { getAnimation } from '../animations';
import { createStyleSheet, getContainer, escapeHtml } from '../utils/dom';
import { generateId, mergeOptions, mergeStyles, limitToasts } from '../utils/helpers';

// Store active toasts
const activeToasts: Map<string, NotifyInstance> = new Map();
// Store toast queue
const toastQueue: NotifyQueueItem[] = [];
// Store default options
let defaultOptions: Partial<NotifyOptions> = { ...DEFAULT_OPTIONS };

// Process the queue
const processQueue = () => {
  if (toastQueue.length === 0) return;
  
  const nextToast = toastQueue.shift();
  if (!nextToast) return;
  
  const { options } = nextToast;
  const instance = createToast(options);
  nextToast.instance = instance;
};

// Create a toast notification
const createToast = (options: NotifyOptions): NotifyInstance => {
  const id = options.id || generateId();
  const mergedOptions = mergeOptions(options, defaultOptions);
  
  // Get theme styles
  const themeStyles = getThemeStyles(
    mergedOptions.theme || 'default', 
    mergedOptions.type || 'success'
  );
  
  // Merge with custom styles
  const finalStyles = mergeStyles(themeStyles, mergedOptions.style);
  
  // Get animation
  const animationIn = getAnimation(
    mergedOptions.animation || 'fade', 
    'in', 
    mergedOptions.position || { x: 'right', y: 'bottom' }
  );
  
  // Add animation styles
  if (animationIn.keyframes) {
    createStyleSheet(`notifier-animation-${id}`, animationIn.keyframes);
  }
  
  // Get container
  const container = getContainer(
    mergedOptions.position || { x: 'right', y: 'bottom' },
    mergedOptions.rtl
  );
  
  // Limit toasts if needed
  if (mergedOptions.maxToasts) {
    limitToasts(container, mergedOptions.maxToasts);
  }
  
  // Prepare message
  let messageContent = mergedOptions.message;
  if (mergedOptions.escapeHtml) {
    messageContent = escapeHtml(messageContent);
  }
  
  // Create Toastify options
  const toastifyOptions: any = {
    text: messageContent,
    duration: mergedOptions.duration,
    gravity: mergedOptions.position?.y,
    position: mergedOptions.position?.x,
    className: `notifier-mycin-toast ${mergedOptions.className || ''}`,
    style: {
      ...finalStyles,
      background: finalStyles.backgroundColor || TYPE_COLORS[mergedOptions.type || 'success']
    },
    selector: container,
    stopOnFocus: mergedOptions.pauseOnHover,
    onClick: mergedOptions.onClick,
    close: false, // No close button
    destination: undefined,
    newWindow: false,
    node: mergedOptions.customContent
  };
  
  // Create toast
  const toast = Toastify(toastifyOptions);
  
  // Show toast
  toast.showToast();
  
  // Add animation if needed
  if (toast.toastElement && animationIn.animation) {
    const element = toast.toastElement as HTMLElement;
    element.style.animation = animationIn.animation;
    
    // Make toast elements clickable
    element.style.pointerEvents = 'auto';
    
    // Add hover event if needed
    if (mergedOptions.onHover) {
      element.addEventListener('mouseenter', mergedOptions.onHover);
    }
  }
  
  // Create the instance
  const instance: NotifyInstance = {
    showToast: () => {
      if (!toast.toastElement) {
        toast.showToast();
      }
    },
    hideToast: () => {
      // Get animation for hiding
      const animationOut = getAnimation(
        mergedOptions.animation || 'fade', 
        'out', 
        mergedOptions.position || { x: 'right', y: 'bottom' }
      );
      
      // Add animation styles
      if (animationOut.keyframes) {
        createStyleSheet(`notifier-animation-out-${id}`, animationOut.keyframes);
      }
      
      // Apply animation
      if (animationOut.animation && toast.toastElement) {
        const element = toast.toastElement as HTMLElement;
        element.style.animation = animationOut.animation;
        
        // Wait for animation to complete
        setTimeout(() => {
          toast.hideToast();
          activeToasts.delete(id);
          // Process next toast in queue
          processQueue();
        }, 300); // Animation duration
      } else {
        toast.hideToast();
        activeToasts.delete(id);
        // Process next toast in queue
        processQueue();
      }
    },
    updateToast: (newOptions: Partial<NotifyOptions>) => {
      if (!toast.toastElement) return;
      
      // Update message if provided
      if (newOptions.message) {
        toast.toastElement.textContent = newOptions.message;
      }
      
      // Update styles if provided
      if (newOptions.style) {
        const element = toast.toastElement as HTMLElement;
        Object.assign(element.style, newOptions.style);
      }
      
      // Update duration if provided
      if (newOptions.duration && newOptions.duration > 0) {
        // Set new timeout
        setTimeout(() => {
          activeToasts.delete(id);
          instance.hideToast();
          if (mergedOptions.onClose) mergedOptions.onClose();
        }, newOptions.duration);
      }
    },
    id
  };
  
  // Add to active toasts
  activeToasts.set(id, instance);
  
  // Set timeout to remove from active toasts
  if (mergedOptions.duration && mergedOptions.duration > 0) {
    setTimeout(() => {
      activeToasts.delete(id);
      instance.hideToast();
      // Process next toast in queue
      processQueue();
      if (mergedOptions.onClose) mergedOptions.onClose();
    }, mergedOptions.duration);
  }
  
  return instance;
};

// Create the Notify manager
const Notify: NotifyManager = {
  show: (options: NotifyOptions | string): NotifyInstance => {
    const opts = typeof options === 'string' ? { message: options } : options;
    
    // Check if we should queue this toast
    if (opts.stack === false || (defaultOptions.stack === false && opts.stack !== true)) {
      // Dismiss all existing toasts
      Notify.dismissAll();
      return createToast(opts as NotifyOptions);
    }
    
    // Add to queue if we're at max toasts
    const maxToasts = opts.maxToasts || defaultOptions.maxToasts || 5;
    if (activeToasts.size >= maxToasts) {
      const queueItem: NotifyQueueItem = { options: opts as NotifyOptions };
      toastQueue.push(queueItem);
      return {
        showToast: () => {
          if (queueItem.instance) queueItem.instance.showToast();
        },
        hideToast: () => {
          if (queueItem.instance) queueItem.instance.hideToast();
        },
        updateToast: (newOptions) => {
          if (queueItem.instance) queueItem.instance.updateToast(newOptions);
          else {
            queueItem.options = { ...queueItem.options, ...newOptions };
          }
        },
        id: opts.id || generateId()
      };
    }
    
    return createToast(opts as NotifyOptions);
  },
  
  success: (message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
    return Notify.show({ message, type: 'success', ...options });
  },
  
  error: (message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
    return Notify.show({ message, type: 'error', ...options });
  },
  
  warning: (message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
    return Notify.show({ message, type: 'warning', ...options });
  },
  
  info: (message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
    return Notify.show({ message, type: 'info', ...options });
  },
  
  custom: (options: NotifyOptions): NotifyInstance => {
    return Notify.show({ ...options, type: 'custom' });
  },
  
  dismiss: (id?: string): void => {
    if (id) {
      const instance = activeToasts.get(id);
      if (instance) {
        instance.hideToast();
      }
    } else {
      // Dismiss the most recent toast
      const lastToastId = Array.from(activeToasts.keys()).pop();
      if (lastToastId) {
        const instance = activeToasts.get(lastToastId);
        if (instance) {
          instance.hideToast();
        }
      }
    }
  },
  
  dismissAll: (): void => {
    activeToasts.forEach(instance => {
      instance.hideToast();
    });
    // Clear the queue
    toastQueue.length = 0;
  },
  
  update: (id: string, options: Partial<NotifyOptions>): void => {
    const instance = activeToasts.get(id);
    if (instance) {
      instance.updateToast(options);
    }
  },
  
  isActive: (id: string): boolean => {
    return activeToasts.has(id);
  },
  
  getActive: (): string[] => {
    return Array.from(activeToasts.keys());
  },
  
  setDefaults: (options: Partial<NotifyOptions>): void => {
    defaultOptions = { ...defaultOptions, ...options };
  },
  
  getDefaults: (): Partial<NotifyOptions> => {
    return { ...defaultOptions };
  }
};

export default Notify; 