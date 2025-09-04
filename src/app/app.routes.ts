// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AuthLayoutComponent } from './auth/layout/layout.component';
import { AuthenticatedLayoutComponent } from './layouts/authenticated-layout.component'; // 1. IMPORTAR

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
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
  // 2. CREAR UNA RUTA PADRE PARA LAS PÁGINAS AUTENTICADAS
  {
    path: '', // Usamos una ruta vacía para que las URLs no sean /app/home
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard], // El guard protege todo el layout
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      // 3. DESCOMENTAR Y MOVER TABS AQUÍ DENTRO
      {
        path: 'tabs',
        loadComponent: () =>
          import('./tabs/tabs.component').then((m) => m.TabsComponent),
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
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
