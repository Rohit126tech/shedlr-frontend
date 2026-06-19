import { Routes } from '@angular/router';


export const routes: Routes = [
    {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes',)
      .then(r => r.AUTH_ROUTES)
  },
  {
    path:'dashboard',
    loadComponent:()=>
      import('./features/dashboard/dashboard')
    .then(r => r.Dashboard)
  }
];
