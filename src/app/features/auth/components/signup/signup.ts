import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../../../core/services/toast-service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  hidePassword = true;
  hideConfirmPassword = true;
  signupForm!: FormGroup;

  submitted = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastService,
  ) {
    this.signupForm = this.fb.group(
      {
        fullName: ['', Validators.required],

        email: ['', [Validators.required, Validators.email]],

        password: ['', [Validators.required, Validators.minLength(8)]],

        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],

        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordMatchValidator(),
      },
    );
  }

  get f() {
    return this.signupForm.controls;
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  passwordMatchValidator() {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password');

      const confirmPassword = formGroup.get('confirmPassword');

      if (!password || !confirmPassword) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        return {
          passwordMismatch: true,
        };
      }

      return null;
    };
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();

      console.log('Form Invalid');
      console.log(this.signupForm.errors);
      console.log(this.signupForm.value);

      return;
    }

    const payload = {
      fullName: this.signupForm.value.fullName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword,
      acceptTerms: this.signupForm.value.acceptTerms,
    };

    this.authService.signup(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Account created successfully');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err.error?.message || 'Something went wrong');
      },
    });
  }
}
