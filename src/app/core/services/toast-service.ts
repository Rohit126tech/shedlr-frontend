import { Injectable, signal } from '@angular/core';

import { ToastModel, ToastType } from '../models/toastModel';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  
  constructor() { }
   private toastsSignal = signal<ToastModel[]>([]);
  toasts = this.toastsSignal.asReadonly();
  private counter = 0;

  show(message: string, type: ToastType = 'info', duration: number = 3000) {
    const id = this.counter++;
    const toast: ToastModel = { id, message, type };
    
    this.toastsSignal.update(toasts => [...toasts, toast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  remove(id: number) {
    this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
  }

}
