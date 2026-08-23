import { create } from 'zustand';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

export interface ToastInput {
  message: string;
  variant?: ToastVariant;
  /** Milliseconds before auto-dismiss. Use 0 to keep the toast until dismissed. */
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (input: ToastInput) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
}

const DEFAULT_DURATION = 4000;
const MAX_TOASTS = 4;

let counter = 0;
const nextId = (): string => {
  counter += 1;
  return `toast-${counter}`;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: ({ message, variant = 'info', duration = DEFAULT_DURATION }) => {
    const id = nextId();
    set((state) => ({
      toasts: [...state.toasts, { id, message, variant, duration }].slice(
        -MAX_TOASTS
      ),
    }));
    return id;
  },
  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  clearToasts: () => {
    set({ toasts: [] });
  },
}));
