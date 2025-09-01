// src/app/auth/login/login.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SupabaseService } from '../../services/supabase.service';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
  IonSpinner,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  host: { class: 'ion-page' }, // <-- AGREGAR ESTA LÍNEA
  imports: [
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonAlert,
    IonSpinner,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = '';
  isLoading: boolean = false;
  connectionTested: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async ngOnInit() {
    try {
      await this.supabaseService.testConnection();
      this.connectionTested = true;
      console.log('LoginComponent: ngOnInit');
    } catch (error) {
      this.connectionTested = true;
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.alertMessage = 'Por favor, completa todos los campos';
      this.showAlert = true;
      return;
    }

    this.isLoading = true;
    this.showAlert = false;

    const { email, password } = this.form.value;

    try {
      // Deshabilita controles correctamente (evita binding [disabled] directo)
      this.form.disable();

      const result = await this.authService.signIn(email, password);
      this.router.navigate(['/tabs/tab1']);
    } catch (error: any) {
      this.alertMessage =
        error.message || 'Error al iniciar sesión. Intenta nuevamente.';
      this.showAlert = true;
    } finally {
      this.isLoading = false;
      this.form.enable();
    }
  }

  onAlertDismiss() {
    this.showAlert = false;
  }

  ngOnDestroy() {
    console.log('LoginComponent: ngOnDestroy');
  }
}
