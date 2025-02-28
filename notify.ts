import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

/**
 * Displays a customizable notification toast using Toastify-js.
 *
 * This function allows you to show a notification toast with customizable message, duration, type, position, and click handler.
 * The toast can be styled as either a success or error message, and its position can be adjusted to different corners of the screen.
 *
 * @param {string} message - The message to display in the toast.
 * @param {number} [duration=3000] - The duration (in milliseconds) for which the toast will be visible. Default is 3000ms (3 seconds).
 * @param {"success" | "error"} [type="success"] - The type of toast. Determines the background color. "success" uses a green color, and "error" uses a red color. Default is "success".
 * @param {"left" | "right"} [xposition="right"] - The horizontal position of the toast. Can be either "left" or "right". Default is "right".
 * @param {"top" | "bottom"} [yposition="bottom"] - The vertical position of the toast. Can be either "top" or "bottom". Default is "bottom".
 * @param {Function} [onClick=() => {}] - A callback function that will be triggered when the toast is clicked. Default is an empty function.
 *
 * @example
 * // Display a success toast at the bottom-right corner
 * Notify("Operation successful!");
 *
 * @example
 * // Display an error toast at the top-left corner with a custom duration and click handler
 * Notify("Something went wrong!", 5000, "error", "left", "top", () => {
 *   console.log("Toast clicked!");
 * });
 *
 * @returns {void} This function does not return any value.
 */

function Notify(
    message: string,
    duration: number = 3000,
    type: "success" | "error" = "success",
    xposition: "left" | "right" = "right",
    yposition: "top" | "bottom" = "bottom",
    onClick: Function = () => {},
): void {
    const backgroundColor = type === "success" ? "#28a745" : "#dc3545";

    const options: object = {
        text: message,
        duration: duration,
        gravity: yposition,
        position: xposition,
        backgroundColor,
        onClick,
        style: {
            borderRadius: "8px",
            padding: "12px 24px",
        },
    };

    Toastify(options).showToast();
}

export default Notify;