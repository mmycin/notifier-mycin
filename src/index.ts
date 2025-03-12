import Notify from './core/notify';
import type { NotifyOptions, NotifyInstance, NotifyManager, NotifyType, NotifyPosition, NotifyAnimation, NotifyTheme, NotifyStyle } from './core/types';
import { useNotify, useNotifyQueue } from './hooks';

// Export the main Notify function as default
export default Notify;

// Export types
export type {
  NotifyOptions,
  NotifyInstance,
  NotifyManager,
  NotifyType,
  NotifyPosition,
  NotifyAnimation,
  NotifyTheme,
  NotifyStyle
};

// Export hooks for React
export {
  useNotify,
  useNotifyQueue
};

// Export a simple function for basic usage
export const notify = (message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
  return Notify.show({ message, ...options });
};

// Export convenience methods
export const success = (message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
  return Notify.success(message, options);
};

export const error = (message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
  return Notify.error(message, options);
};

export const warning = (message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
  return Notify.warning(message, options);
};

export const info = (message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
  return Notify.info(message, options);
}; 