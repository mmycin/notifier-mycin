import { useState, useCallback, useEffect } from 'react';
import type { NotifyOptions } from '../core/types';
import Notify from '../core/notify';

/**
 * React hook for managing a queue of notifications
 * 
 * @returns An object with methods to manage the notification queue
 */
export const useNotifyQueue = () => {
  const [queue, setQueue] = useState<{ options: NotifyOptions; id: string }[]>([]);
  const [activeNotifications, setActiveNotifications] = useState<string[]>([]);
  const [maxConcurrent, setMaxConcurrent] = useState(3);

  // Process the queue
  const processQueue = useCallback(() => {
    if (queue.length === 0 || activeNotifications.length >= maxConcurrent) {
      return;
    }

    const nextNotification = queue[0];
    const newQueue = queue.slice(1);
    setQueue(newQueue);

    const instance = Notify.show(nextNotification!.options);
    setActiveNotifications((prev: string[]) => [...prev, instance.id]);

    // Set up auto-removal when notification closes
    const duration = nextNotification!.options.duration || 3000;
    setTimeout(() => {
      setActiveNotifications((prev: string[]) => prev.filter((id: string) => id !== instance.id));
      // Process next item in queue
      processQueue();
    }, duration);
  }, [queue, activeNotifications, maxConcurrent]);

  // Add a notification to the queue
  const enqueue = useCallback((options: NotifyOptions | string): string => {
    const opts = typeof options === 'string' ? { message: options } : options;
    const id = opts.id || `queue-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const notificationOptions = { ...opts, id };
    
    setQueue((prev: { options: NotifyOptions; id: string }[]) => [...prev, { options: notificationOptions as NotifyOptions, id }]);
    return id;
  }, []);

  // Remove a notification from the queue
  const dequeue = useCallback((id: string): void => {
    setQueue((prev: { options: NotifyOptions; id: string }[]) => prev.filter((item: { options: NotifyOptions; id: string }) => item.id !== id));
    
    // If it's active, dismiss it
    if (activeNotifications.includes(id)) {
      Notify.dismiss(id);
      setActiveNotifications((prev: string[]) => prev.filter((activeId: string) => activeId !== id));
    }
  }, [activeNotifications]);

  // Clear the entire queue
  const clearQueue = useCallback((): void => {
    setQueue([]);
    // Dismiss all active notifications
    activeNotifications.forEach((id: string) => {
      Notify.dismiss(id);
    });
    setActiveNotifications([]);
  }, [activeNotifications]);

  // Set the maximum number of concurrent notifications
  const setMaxConcurrentNotifications = useCallback((max: number): void => {
    setMaxConcurrent(max);
  }, []);

  // Process queue whenever it changes or active notifications change
  useEffect(() => {
    processQueue();
  }, [queue, activeNotifications, processQueue]);

  return {
    enqueue,
    dequeue,
    clearQueue,
    getQueueLength: () => queue.length,
    getActiveCount: () => activeNotifications.length,
    setMaxConcurrentNotifications
  };
}; 