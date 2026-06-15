import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastModel } from '../../core/models/toastModel';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
constructor(public toastService:ToastService) {}

  getTypeClass(toast: ToastModel): string {
    return `toast-${toast.type}`;
  }
}
