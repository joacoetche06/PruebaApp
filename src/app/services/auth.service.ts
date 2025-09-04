// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar/snackbar.service';
import { Subject } from 'rxjs'; // Importar Subject

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Crear un Subject para emitir cambios de estado de autenticación
  private authState = new Subject<'SIGNED_IN' | 'SIGNED_OUT'>();
  public authState$ = this.authState.asObservable();

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  async signUp(email: string, password: string): Promise<any> {
    try {
      console.log('Starting registration for:', email);

      const { data, error } = await this.supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        console.error('Supabase signup error:', error);
        throw error;
      }

      console.log('Registration successful:', data);
      return data;
    } catch (error) {
      console.error('Auth service signup error:', error);
      throw error;
    }
  }
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

      if (data.session) {
        localStorage.setItem('auth_token', data.session.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Session saved to localStorage');

        // Emitir el evento de inicio de sesión
        this.authState.next('SIGNED_IN');
      }
      this.snackbarService.showMessage('Sesión iniciada con éxito!', 'success');

      return data;
    } catch (error) {
      console.error('Auth service error:', error);
      throw error;
    }
  }

  async signOut() {
    await this.supabase.client.auth.signOut(); // Usar await aquí

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.snackbarService.showMessage('Sesión cerrada con exito!', 'success');

    // Emitir el evento de cierre de sesión
    this.authState.next('SIGNED_OUT');

    // ELIMINAR LA NAVEGACIÓN DE AQUÍ
    // this.router.navigate(['/']);
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
