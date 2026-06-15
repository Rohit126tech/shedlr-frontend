import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '../core/services/toast-service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  hidePassword = true;
  hideConfirmPassword = true;
   signupForm!: FormGroup;
  showSignupForm = true;
 constructor(private fb: FormBuilder) {
  this.signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
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

  onSubmit() {
    console.log('hiiii')
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
   
    console.log(this.signupForm.value);
     this.showSignupForm = false;
  }
}
