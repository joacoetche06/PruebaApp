// src/app/guard/auth.guard.ts
import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  canActivate(): boolean | UrlTree {
    console.log('[AuthGuard] canActivate triggered.');
    const isAuthenticated = this.authService.isAuthenticated();
    console.log(`[AuthGuard] Is authenticated: ${isAuthenticated}`);

    if (isAuthenticated) {
      console.log('[AuthGuard] Access granted.');
      return true;
    } else {
      console.log('[AuthGuard] Access denied. Redirecting to /login.');
      // Usamos NgZone.run para asegurarnos de que la redirección
      // se ejecute dentro de la zona de Angular y actualice la vista.
      return this.ngZone.run(() => this.router.createUrlTree(['/login']));
    }
  }
}
