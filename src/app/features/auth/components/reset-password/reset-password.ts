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
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../../../core/services/toast-service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  token = '';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
     private toastr: ToastService,
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        token: ['', Validators.required],

        newPassword: ['', [Validators.required, Validators.minLength(8)]],

        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const token = params.get('token') ?? '';

      this.resetPasswordForm.patchValue({
        token,
      });
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value;

    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const payload = this.resetPasswordForm.value;
this.authService.resetPassword(payload).subscribe({
  next: (res) => {
        console.log(res);
        this.toastr.success('Account created successfully');
      }
    }
)
  }

  get f() {
    return this.resetPasswordForm.controls;
  }
}
