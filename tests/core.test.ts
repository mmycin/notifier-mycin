import { describe, test, expect, beforeEach, afterEach, mock } from 'bun:test';
import Notify from '../src/core/notify';

// Mock DOM elements and functions
const mockToastElement = {
  style: {},
  querySelector: mock(() => ({
    animate: mock(),
    addEventListener: mock()
  })),
  addEventListener: mock(),
  setAttribute: mock()
};

const mockToastify = mock(() => ({
  showToast: mock(() => {}),
  hideToast: mock(() => {}),
  toastElement: mockToastElement
}));

// Mock global document
global.document = {
  createElement: mock(() => ({
    id: '',
    className: '',
    style: {},
    appendChild: mock(),
    textContent: '',
    setAttribute: mock()
  })),
  head: {
    appendChild: mock()
  },
  body: {
    appendChild: mock()
  },
  getElementById: mock(() => null),
  getElementsByTagName: mock(() => [{ appendChild: mock() }]),
  createTextNode: mock(() => ({}))
} as any;

// Mock Toastify
// Using Bun's mock instead of jest.mock
const originalModule = require('toastify-js');
mock.module('toastify-js', () => mockToastify);

describe('Notify Core', () => {
  beforeEach(() => {
    // Reset mocks
    mockToastify.mockClear();
    mockToastElement.querySelector.mockClear();
  });

  afterEach(() => {
    // Dismiss all notifications
    Notify.dismissAll();
  });

  test('should show a success notification', () => {
    const instance = Notify.success('Success message');
    expect(instance).toBeDefined();
    expect(instance.id).toBeDefined();
    expect(mockToastify).toHaveBeenCalled();
  });

  test('should show an error notification', () => {
    const instance = Notify.error('Error message');
    expect(instance).toBeDefined();
    expect(mockToastify).toHaveBeenCalled();
  });

  test('should update a notification', () => {
    const instance = Notify.success('Initial message');
    Notify.update(instance.id, { message: 'Updated message' });
    
    // Check if querySelector was called to find the message element
    expect(mockToastElement.querySelector).toHaveBeenCalled();
  });

  test('should dismiss a notification', () => {
    const instance = Notify.success('Test message');
    Notify.dismiss(instance.id);
    
    // Check if the notification is no longer active
    expect(Notify.isActive(instance.id)).toBe(false);
  });

  test('should dismiss all notifications', () => {
    Notify.success('Message 1');
    Notify.success('Message 2');
    Notify.dismissAll();
    
    // Check if there are no active notifications
    expect(Notify.getActive().length).toBe(0);
  });

  test('should set default options', () => {
    const customDefaults = { duration: 5000, position: { x: 'left' as 'left', y: 'top' as 'top' } };
    Notify.setDefaults(customDefaults);
    
    const defaults = Notify.getDefaults();
    expect(defaults.duration).toBe(5000);
    expect(defaults.position?.x).toBe('left');
    expect(defaults.position?.y).toBe('top');
  });
});