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
  
  // Create custom HTML if needed
  let customHtml: string | undefined;
  if (mergedOptions.icon || mergedOptions.closeButton) {
    let iconHtml = '';
    let closeButtonHtml = '';
    
    if (mergedOptions.icon) {
      if (typeof mergedOptions.icon === 'string') {
        iconHtml = `<span class="notifier-mycin-icon">${mergedOptions.icon}</span>`;
      } else {
        // Default icons based on type
        const iconMap: Record<string, string> = {
          success: '✓',
          error: '✕',
          warning: '⚠',
          info: 'ℹ',
          custom: '•'
        };
        iconHtml = `<span class="notifier-mycin-icon">${iconMap[mergedOptions.type || 'success']}</span>`;
      }
    }
    
    if (mergedOptions.closeButton) {
      closeButtonHtml = `<span class="notifier-mycin-close">×</span>`;
    }
    
    customHtml = `
      <div class="notifier-mycin-content">
        ${iconHtml}
        <span class="notifier-mycin-message">${messageContent}</span>
        ${closeButtonHtml}
      </div>
      ${mergedOptions.progressBar ? '<div class="notifier-mycin-progress"></div>' : ''}
    `;
  }
  
  // Create Toastify options
  const toastifyOptions: any = {
    text: customHtml || messageContent,
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
    close: !customHtml && mergedOptions.closeButton,
    destination: undefined,
    newWindow: false,
    node: mergedOptions.customContent
  };
  
  // Create toast
  const toast = Toastify(toastifyOptions);
  
  // Add animation
  if (animationIn.animation && toast.toastElement) {
    const element = toast.toastElement as HTMLElement;
    element.style.animation = animationIn.animation;
  }
  
  // Store the instance
  const instance: NotifyInstance = {
    showToast: () => {
      toast.showToast();
      
      // Add progress bar animation if needed
      if (mergedOptions.progressBar && mergedOptions.duration && mergedOptions.duration > 0 && toast.toastElement) {
        const progressBar = toast.toastElement.querySelector('.notifier-mycin-progress');
        if (progressBar) {
          progressBar.animate(
            [
              { width: '100%' },
              { width: '0%' }
            ],
            {
              duration: mergedOptions.duration,
              fill: 'forwards',
              easing: 'linear'
            }
          );
        }
      }
      
      // Add close button event listener
      if (toast.toastElement) {
        const closeButton = toast.toastElement.querySelector('.notifier-mycin-close');
        if (closeButton) {
          closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            instance.hideToast();
            if (mergedOptions.onClose) mergedOptions.onClose();
          });
        }
        
        // Add hover event
        if (mergedOptions.onHover) {
          toast.toastElement.addEventListener('mouseenter', mergedOptions.onHover);
        }
        
        // Make toast elements clickable
        const element = toast.toastElement as HTMLElement;
        element.style.pointerEvents = 'auto';
      }
      
      // Add to active toasts
      activeToasts.set(id, instance);
      
      // Set timeout to remove from active toasts
      if (mergedOptions.duration && mergedOptions.duration > 0) {
        setTimeout(() => {
          activeToasts.delete(id);
          // Process next toast in queue
          processQueue();
          if (mergedOptions.onClose) mergedOptions.onClose();
        }, mergedOptions.duration);
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
        const messageElement = toast.toastElement.querySelector('.notifier-mycin-message');
        if (messageElement) {
          messageElement.textContent = newOptions.message;
        } else {
          toast.toastElement.textContent = newOptions.message;
        }
      }
      
      // Update styles if provided
      if (newOptions.style) {
        const element = toast.toastElement as HTMLElement;
        Object.assign(element.style, newOptions.style);
      }
      
      // Update duration if provided
      if (newOptions.duration && newOptions.duration > 0) {
        // Reset timeout
        toast.hideToast();
        setTimeout(() => {
          toast.showToast();
          
          // Update progress bar
          if (mergedOptions.progressBar && toast.toastElement) {
            const progressBar = toast.toastElement.querySelector('.notifier-mycin-progress');
            if (progressBar) {
              progressBar.animate(
                [
                  { width: '100%' },
                  { width: '0%' }
                ],
                {
                  duration: newOptions.duration,
                  fill: 'forwards',
                  easing: 'linear'
                }
              );
            }
          }
          
          // Set new timeout
          setTimeout(() => {
            activeToasts.delete(id);
            // Process next toast in queue
            processQueue();
            if (mergedOptions.onClose) mergedOptions.onClose();
          }, newOptions.duration);
        }, 100);
      }
    },
    id
  };
  
  // Show toast
  instance.showToast();
  
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