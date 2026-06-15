import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '../core/services/toast-service';
import { Loader } from '../shared/loader/loader';
import { LoaderService } from '../core/services/loader-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

 
  loginForm: FormGroup;
  hidePassword = true;
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
  constructor(private fb: FormBuilder,private toastService:ToastService, private loader:Loader,private loaderService: LoaderService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
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
    this.loaderService.show();
    setTimeout(() => {
    this.loaderService.hide();
    this.toastService.success('Login Successfully!!');
  }, 3000);
    
    console.log('Form Submitted');
    console.log(this.loginForm.value);

    
  }
  togglePassword(): void {
  this.hidePassword = !this.hidePassword;
}
   changeSlide(index: number) {
    this.currentSlide.set(index);
  }
}
