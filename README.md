# Notifier-Mycin

A lightweight, highly customizable notification toast library built with Toastify-js.

[![npm version](https://img.shields.io/npm/v/notifier-mycin.svg)](https://www.npmjs.com/package/notifier-mycin)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

## 🚀 Features
- **Simple & Intuitive API** – Easily create notifications with minimal code.
- **Fully Customizable** – Modify themes, styles, positions, durations, and more.
- **Flexible Positioning** – Display notifications in any corner of the screen.
- **Auto-Dismiss & Manual Control** – Set durations or manually dismiss notifications.
- **Real-time Updates** – Update existing notifications dynamically.
- **React Hooks Support** – Seamless integration with React applications.
- **TypeScript Ready** – Fully typed with robust definitions.

## 📦 Installation
Install via npm or yarn:

```bash
npm install notifier-mycin
```

or

```bash
yarn add notifier-mycin
```

## 🚀 Usage

### Basic Example
```typescript
import Notify from 'notifier-mycin';

// Show a success notification
Notify.success('Operation successful!');

// Show an error notification
Notify.error('Something went wrong.');
```

### Customizing Notifications
Enhance your notifications by passing custom options:

```typescript
import Notify from 'notifier-mycin';

const options = {
  duration: 5000, // Duration in milliseconds
  position: { x: 'left', y: 'top' }, // Position on screen
  theme: 'dark', // Theme variant
  style: 'solid', // Style type
  className: 'my-custom-class', // Custom CSS class
  icon: 'info-circle', // Icon
  iconColor: 'blue', // Icon color
  title: 'Notification Title', // Title
  message: 'Detailed message text' // Message content
};

Notify.success('Success message', options);
```

### React Hook Usage
If using React, leverage the `useNotify` hook for cleaner integration:

```typescript
import { useNotify } from 'notifier-mycin';

function MyComponent() {
  const notify = useNotify();

  const handleClick = () => {
    notify.success('Success message');
  };

  return <button onClick={handleClick}>Show Notification</button>;
}
```

### Updating & Dismissing Notifications
Modify or remove notifications dynamically:

```typescript
import Notify from 'notifier-mycin';

const notification = Notify.success('Initial message');

// Update the notification
Notify.update(notification.id, { message: 'Updated message' });

// Dismiss the notification
Notify.dismiss(notification.id);
```

### Dismissing All Notifications
Clear all active notifications with a single call:

```typescript
import Notify from 'notifier-mycin';

Notify.success('Message 1');
Notify.success('Message 2');

Notify.dismissAll();
```

### Setting Default Options
Configure global default settings for all notifications:

```typescript
import Notify from 'notifier-mycin';

Notify.setDefaults({
  duration: 5000,
  position: { x: 'left', y: 'top' },
  theme: 'dark',
  style: 'solid',
  className: 'my-custom-class',
  icon: 'info-circle',
  iconColor: 'blue',
  title: 'Notification Title',
  message: 'Notification Message'
});
```

## 💡 Contributing
Contributions are welcome! If you encounter a bug or have a feature request, please open an issue or submit a pull request.

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 📬 Contact
For questions or support, feel free to reach out:
📧 [mycin.mit@gmail.com](mailto:mycin.mit@gmail.com)

---

Start using **Notifier-Mycin** today and enhance your notifications effortlessly! 🚀

