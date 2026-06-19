import { Routes } from '@angular/router';
import { Login } from './components/login/login';

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then((c) => c.Login),
  },

  {
    path: 'register',
    loadComponent: () => import('./components/signup/signup').then((c) => c.Signup),
  },

  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./components/forget-password/forget-password').then((c) => c.ForgetPassword),
  },
    {
    path: 'verify-email',
    loadComponent: () =>
      import('./components/verify-email/verify-email').then((c) => c.VerifyEmail),
  },
   {
    path: 'reset-password',
    loadComponent: () =>
      import('./components/reset-password/reset-password').then((c) => c.ResetPasswordComponent),
  },
];
