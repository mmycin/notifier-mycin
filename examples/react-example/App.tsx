import React, { useState } from 'react';
// @ts-ignore
import { useNotify, useNotifyQueue } from 'notifier-mycin';

const App: React.FC = () => {
  const notify = useNotify();
  const notifyQueue = useNotifyQueue();
  const [message, setMessage] = useState('Hello from React!');

  const showBasicNotification = () => {
    notify.show(message);
  };

  const showSuccessNotification = () => {
    notify.success(message, {
      position: { x: 'right', y: 'top' },
      duration: 4000
    });
  };

  const showErrorNotification = () => {
    notify.error(message, {
      position: { x: 'left', y: 'bottom' },
      animation: 'slide'
    });
  };

  const showWarningNotification = () => {
    notify.warning(message, {
      theme: 'minimal'
    });
  };

  const showInfoNotification = () => {
    notify.info(message, {
      animation: 'zoom'
    });
  };

  const showCustomNotification = () => {
    notify.custom({
      message,
      position: { x: 'center', y: 'top' },
      animation: 'bounce',
      theme: 'custom',
      style: {
        backgroundColor: '#673ab7',
        color: 'white',
        borderRadius: '16px'
      }
    });
  };

  const addToQueue = () => {
    notifyQueue.enqueue({
      message: `Queued notification ${Math.floor(Math.random() * 100)}`,
      type: 'info'
    });
  };

  const clearQueue = () => {
    notifyQueue.clearQueue();
  };

  return (
    <div className="container">
      <h1>Notifier-Mycin React Example</h1>
      
      <div className="input-group">
        <label htmlFor="message">Notification Message:</label>
        <input
          id="message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      
      <div className="button-group">
        <button onClick={showBasicNotification}>Basic</button>
        <button onClick={showSuccessNotification}>Success</button>
        <button onClick={showErrorNotification}>Error</button>
        <button onClick={showWarningNotification}>Warning</button>
        <button onClick={showInfoNotification}>Info</button>
        <button onClick={showCustomNotification}>Custom</button>
      </div>
      
      <h2>Queue Example</h2>
      <div className="button-group">
        <button onClick={addToQueue}>Add to Queue</button>
        <button onClick={clearQueue}>Clear Queue</button>
      </div>
      
      <div className="queue-info">
        <p>Queue Length: {notifyQueue.getQueueLength()}</p>
        <p>Active Notifications: {notifyQueue.getActiveCount()}</p>
      </div>
    </div>
  );
};

export default App; 