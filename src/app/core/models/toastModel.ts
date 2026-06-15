export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastModel {
  id: number;
  message: string;
  type: ToastType;
}