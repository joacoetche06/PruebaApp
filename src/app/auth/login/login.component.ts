// src/app/auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
  IonSpinner,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonAlert,
    IonSpinner,
    FormsModule,
    CommonModule,
  ],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  isLoading: boolean = false;
  connectionTested: boolean = false;

  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log('Valor inicial de showAlert:', this.showAlert);

    try {
      await this.supabaseService.testConnection();
      console.log('Connection test successful: ', this.showAlert);
      this.connectionTested = true;
    } catch (error) {
      console.error('Login error:', error);
      console.log('Mostrando alerta...');
      console.log('Connection test completed with potential issues');
      this.connectionTested = true;
    }
  }

  async onSubmit() {
    // Validación básica de campos
    if (!this.email || !this.password) {
      this.alertMessage = 'Por favor, completa todos los campos';
      this.showAlert = true;
      return;
    }

    this.isLoading = true;
    this.showAlert = false;

    try {
      await this.authService.signOut();

      console.log('Attempting login with:', this.email);
      const result = await this.authService.signIn(this.email, this.password);

      console.log('Login successful:', result);

      // Navegar a la página principal
      this.router.navigate(['/tabs/tab1']);
    } catch (error: any) {
      console.error('Login error details:', error);

      if (error.name === 'NavigatorLockAcquireTimeoutError') {
        this.alertMessage =
          'Error de sesión. Por favor, cierra otras pestañas de la aplicación e intenta nuevamente.';
      } else if (error.message?.includes('Invalid login credentials')) {
        this.alertMessage =
          'Credenciales incorrectas. Verifica tu email y contraseña.';
      } else if (error.message?.includes('Email not confirmed')) {
        this.alertMessage =
          'Por favor, confirma tu email antes de iniciar sesión.';
      } else if (error.message?.includes('Network error')) {
        this.alertMessage = 'Error de conexión. Verifica tu internet.';
      } else {
        this.alertMessage =
          error.message || 'Error al iniciar sesión. Intenta nuevamente.';
      }

      this.showAlert = true;
    } finally {
      this.isLoading = false;
    }
  }

  onAlertDismiss() {
    console.log('Alert dismissed, setting showAlert to false');
    this.showAlert = false;
  }
}
