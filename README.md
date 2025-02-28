# Notifier Mycin: A Simple Notification Library

`notifier-mycin` is a lightweight and customizable notification toast library built using [Toastify-js](https://github.com/apvarun/toastify-js). It allows you to easily display success or error notifications with customizable positions, durations, and click handlers.

---

## Installation

You can install `notifier-mycin` via npm:

```bash
npm install notifier-mycin
```

Or via yarn:

```bash
yarn add notifier-mycin
```

---

## Usage

### Importing the Library

First, import the `Notify` function and the required CSS file into your project:

```typescript
import Notify from 'nnotifier-mycin';
```

### Displaying a Toast

You can display a toast notification by calling the `Notify` function with the desired parameters:

```typescript
Notify("Operation successful!"); // Default success toast
```

### Customizing the Toast

The `Notify` function accepts the following parameters:

| Parameter   | Type                     | Default Value   | Description                                                                 |
|-------------|--------------------------|-----------------|-----------------------------------------------------------------------------|
| `message`   | `string`                 | **Required**    | The message to display in the toast.                                        |
| `duration`  | `number`                 | `3000` (3 sec)  | The duration (in milliseconds) for which the toast will be visible.         |
| `type`      | `"success" \| "error"`   | `"success"`     | The type of toast. "success" uses a green background, "error" uses red.     |
| `xposition` | `"left" \| "right"`      | `"right"`       | The horizontal position of the toast.                                       |
| `yposition` | `"top" \| "bottom"`      | `"bottom"`      | The vertical position of the toast.                                         |
| `onClick`   | `Function`               | `() => {}`      | A callback function that is triggered when the toast is clicked.            |

#### Examples

1. **Success Toast (Default)**:
   ```typescript
   Notify("Operation successful!");
   ```

2. **Error Toast**:
   ```typescript
   Notify("Something went wrong!", 5000, "error");
   ```

3. **Custom Position**:
   ```typescript
   Notify("Custom position toast!", 3000, "success", "left", "top");
   ```

4. **With Click Handler**:
   ```typescript
   Notify("Click me!", 3000, "success", "right", "bottom", () => {
       console.log("Toast clicked!");
   });
   ```

---

## Styling

The toast comes with default styling, but you can easily override it by passing custom styles in the `style` object within the `options` parameter. For example:

```typescript
Notify("Custom style toast!", 3000, "success", "right", "bottom", () => {}, {
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "14px"
});
```

---

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch and submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- Built using [Toastify-js](https://github.com/apvarun/toastify-js).
- Inspired by modern notification libraries.

---

Enjoy using `notifier-mycin`! If you have any questions or feedback, feel free to open an issue on GitHub.
