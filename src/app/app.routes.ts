import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    {path:'', component:Login},
    {path:'signup',component:Signup},
    {path:'dashboard',component:Dashboard}
];
