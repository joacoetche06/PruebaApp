// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TabsComponent } from './tabs/tabs.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    pathMatch: 'full',
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
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
