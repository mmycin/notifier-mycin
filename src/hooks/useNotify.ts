import { useCallback } from 'react';
import Notify from '../core/notify';
import type { NotifyInstance, NotifyOptions } from '../core/types';

/**
 * React hook for using Notify in functional components
 * 
 * @returns An object with methods to show different types of notifications
 */
export const useNotify = () => {
  const show = useCallback((options: NotifyOptions | string): NotifyInstance => {
    return Notify.show(options);
  }, []);

  const success = useCallback((message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
    return Notify.success(message, options);
  }, []);

  const error = useCallback((message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
    return Notify.error(message, options);
  }, []);

  const warning = useCallback((message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
    return Notify.warning(message, options);
  }, []);

  const info = useCallback((message: string, options?: Partial<NotifyOptions>): NotifyInstance => {
    return Notify.info(message, options);
  }, []);

  const custom = useCallback((options: NotifyOptions): NotifyInstance => {
    return Notify.custom(options);
  }, []);

  const dismiss = useCallback((id?: string): void => {
    Notify.dismiss(id);
  }, []);

  const dismissAll = useCallback((): void => {
    Notify.dismissAll();
  }, []);

  return {
    show,
    success,
    error,
    warning,
    info,
    custom,
    dismiss,
    dismissAll,
    update: Notify.update,
    isActive: Notify.isActive,
    getActive: Notify.getActive,
    setDefaults: Notify.setDefaults,
    getDefaults: Notify.getDefaults
  };
}; 