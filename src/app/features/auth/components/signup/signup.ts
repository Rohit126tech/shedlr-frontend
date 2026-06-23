import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../../../core/services/toast-service';

import { finalize } from 'rxjs';
import lottie from 'lottie-web';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements AfterViewInit{
  hidePassword = true;
  hideConfirmPassword = true;
  signupForm!: FormGroup;
  showVerification = false;
  passwordStrength = signal(0);
  isSigningUp = false;

  passwordStrengthLabel = computed(() => {
    const strength = this.passwordStrength();

    if (strength <= 20) return 'Very Weak';
    if (strength <= 40) return 'Weak';
    if (strength <= 60) return 'Medium';
    if (strength <= 80) return 'Good';

    return 'Strong';
  });

  submitted = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastService,
    private router: Router,
  ) {
    this.signupForm = this.fb.group(
      {
        fullName: ['', Validators.required],

        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?!.*\.\.)([a-z0-9._%+-]+)@([a-z0-9-]+\.)+[a-z]{2,}$/),
          ],
        ],

        password: [
          '',
          [Validators.required, Validators.minLength(8), this.passwordStrengthValidator()],
        ],

        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],

        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordMatchValidator(),
      },
    );

    this.signupForm.get('password')?.valueChanges.subscribe((password) => {
      this.passwordStrength.set(this.calculatePasswordStrength(password || ''));
    });
  }
ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: document.getElementById('signupAnimation')!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/animations/signup.json',
    });
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
  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      const errors: ValidationErrors = {};

      if (!/[A-Z]/.test(value)) {
        errors['uppercase'] = true;
      }

      if (!/[a-z]/.test(value)) {
        errors['lowercase'] = true;
      }

      if (!/\d/.test(value)) {
        errors['number'] = true;
      }

      if (!/[!@#$%^&*()_\-+=.?]/.test(value)) {
        errors['specialCharacter'] = true;
      }

      return Object.keys(errors).length ? errors : null;
    };
  }
  calculatePasswordStrength(password: string): number {
    let score = 0;

    if (!password) return 0;

    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (/[a-z]/.test(password)) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 15;
    if (/[!@#$%^&*()_\-+=.?]/.test(password)) score += 15;

    return Math.min(score, 100);
  }

  onSubmit() {
    if (this.isSigningUp) {
      return;
    }

    this.submitted = true;

    const email = this.signupForm.value.email?.trim().toLowerCase();

    this.signupForm.patchValue({
      email,
    });

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

    this.isSigningUp = true;

    this.authService
      .signup(payload)
      .pipe(
        finalize(() => {
          this.isSigningUp = false;
        }),
      )
      .subscribe({
        next: (res) => {
          console.log(res);

          this.authService.email = this.signupForm.value.email;

          this.showVerification = true;

          this.toastr.success('Verification email sent successfully');

          this.router.navigateByUrl('/verification-pending');
        },
        error: (err) => {
          console.error(err);

          this.toastr.error(err.error?.message || 'Something went wrong');
        },
      });
  }
}
