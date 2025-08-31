// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private supabase: SupabaseService, private router: Router) {}

  // Iniciar sesión con mejor manejo de errores
  async signIn(email: string, password: string): Promise<any> {
    try {
      console.log('Starting authentication for:', email);

      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        console.error('Supabase auth error:', error);
        throw error;
      }

      console.log('Authentication successful:', data);

      // Guardar sesión en localStorage
      if (data.session) {
        localStorage.setItem('auth_token', data.session.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Session saved to localStorage');
      }

      return data;
    } catch (error) {
      console.error('Auth service error:', error);
      throw error;
    }
  }

  // Cerrar sesión
  async signOut(): Promise<void> {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }

      // Limpiar localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');

      console.log('User signed out successfully');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const isAuth = !!token;
    console.log('Authentication check:', isAuth);
    return isAuth;
  }

  // Obtener usuario actual
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    console.log('Current user:', user);
    return user;
  }
}
