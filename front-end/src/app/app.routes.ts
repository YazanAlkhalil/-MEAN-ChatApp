import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path:'login',
    loadComponent: () => import(
      './pages/login/login.component')
      .then( m => m.LoginComponent)
  },
  {
    path:'register',
    loadComponent: () => import(
      './pages/info/info.component')
      .then( m => m.InfoComponent )
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'login'
  }
];
