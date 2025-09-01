// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AuthLayoutComponent } from './auth/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    // CAMBIO: La ruta raíz ahora redirige directamente a la página de login.
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent, // Carga el layout
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./tabs/tabs.component').then((m) => m.TabsComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('./tabs/tab1/tab1.component').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('./tabs/tab2/tab2.component').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('./tabs/tab3/tab3.component').then((m) => m.Tab3Page),
      },

      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login', // Cualquier otra cosa, a login
  },
];
