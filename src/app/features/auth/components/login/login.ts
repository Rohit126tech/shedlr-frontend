import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';

import { finalize } from 'rxjs';
import { ToastService } from '../../../../core/services/toast-service';
import { LoaderService } from '../../../../core/services/loader-service';
import { AuthService } from '../../services/auth-service';
import { LoginRequest } from '../../models/authRequest.model';
import { LoginForm } from '../../models/authForms.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

 
 loginForm!: FormGroup<LoginForm>;
  hidePassword = signal(true);
  currentSlide = signal(0);
  slides = [
    {
      image: '/assets/images/title1.png',
      title: 'One Platform From Vision to Release',
      description:
        "Unified workspace bridging executive vision with development and QA execution."
    },
    {
      image: '/assets/images/title 2.png',
      title: 'Empowering Executives, Developers, and QA',
      description:
        'Tailored tools empowering cross-functional teams to collaborate from vision to launch.'
    },
    {
      image: '/assets/images/title3.png',
      title: 'Take Control of Sprints and Timelines',
      description:
        'Tailored tools empowering everyone to optimize time and ship flawlessly.'
    }
  ];
  router= inject(Router);
  constructor(private fb: FormBuilder,private toastService:ToastService,private loaderService:LoaderService,private loginService:AuthService) {
    
   
    this.loginForm = this.fb.group<LoginForm>({

      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email
      ]),

      password: this.fb.nonNullable.control('', [
        Validators.required
      ]),

      rememberMe: this.fb.nonNullable.control(false)

    });
  }
  ngOnInit() {
    setInterval(() => {
      this.currentSlide.update(
        value => (value + 1) % this.slides.length
      );
    }, 4000);
  }

  get f() {
    return this.loginForm.controls;
  }

  
onSubmit(): void {

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    this.toastService.error('Enter Valid Credentials');
    return;
  }

  const payload: LoginRequest = this.loginForm.getRawValue();

  this.loaderService.show();

  this.loginService.login(payload)
    .pipe(
      finalize(() => this.loaderService.hide())
    )
    .subscribe({
      next: (res) => {
        this.toastService.success('Login Successfully!!');
        this.router.navigateByUrl('dashboard');
      },

      error: (err) => {
        this.toastService.error('Login failed. Please check your email and password and try again.');
      }
    });
}
  togglePassword(): void {
   this.hidePassword.update(value => !value);
}
   changeSlide(index: number) {
    this.currentSlide.set(index);
  }
}
