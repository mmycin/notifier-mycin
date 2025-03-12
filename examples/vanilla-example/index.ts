// @ts-ignore
import Notify, { success, error, warning, info } from 'notifier-mycin';

// Basic usage
document.getElementById('basic-btn')?.addEventListener('click', () => {
  Notify.show('This is a basic notification');
});

// Success notification
document.getElementById('success-btn')?.addEventListener('click', () => {
  success('Operation completed successfully!');
});

// Error notification
document.getElementById('error-btn')?.addEventListener('click', () => {
  error('Something went wrong!');
});

// Warning notification
document.getElementById('warning-btn')?.addEventListener('click', () => {
  warning('Please be careful!');
});

// Info notification
document.getElementById('info-btn')?.addEventListener('click', () => {
  info('Here is some information for you.');
});

// Custom notification
document.getElementById('custom-btn')?.addEventListener('click', () => {
  Notify.show({
    message: 'This is a custom notification',
    duration: 5000,
    type: 'custom',
    position: { x: 'center', y: 'top' },
    animation: 'bounce',
    theme: 'material',
    closeButton: true,
    progressBar: true,
    pauseOnHover: true,
    style: {
      backgroundColor: '#9c27b0',
      color: 'white'
    },
    onClick: () => {
      console.log('Notification clicked!');
    }
  });
});

// Dismiss all notifications
document.getElementById('dismiss-all-btn')?.addEventListener('click', () => {
  Notify.dismissAll();
}); 