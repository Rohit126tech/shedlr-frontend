import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgotPasswordRequest } from '../../models/authRequest.model';
import { AuthService } from '../../services/auth-service';
import { ForgotPasswordForm } from '../../models/authForms.model';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {
  ShowMessage= false;
  forgotPasswordForm!: FormGroup<ForgotPasswordForm>;
  constructor(private fb: FormBuilder, private authService:AuthService ) {
    this.forgotPasswordForm = this.fb.group<ForgotPasswordForm>({
  email: this.fb.nonNullable.control('', [
    Validators.required,
    Validators.email
  ])
});
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {

  if (this.forgotPasswordForm.invalid) {
    this.forgotPasswordForm.markAllAsTouched();
    return;
  }

  const payload: ForgotPasswordRequest =
    this.forgotPasswordForm.getRawValue();

  this.authService.forgotPassword(payload)
    .subscribe();
  }
}
