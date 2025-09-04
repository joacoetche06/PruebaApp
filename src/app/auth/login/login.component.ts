// src/app/auth/login/login.component.ts
import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
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
import { environment } from '../../../environments/environment';
import { CodigoModalComponent } from '../../modals/codigo-modal/codigo-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  host: { class: 'ion-page' },
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
  email = '';
  password = '';
  quickLoginFlag: boolean = false;
  showQuickLogin = environment.showQuickLogin;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private router: Router,
    private dialog: MatDialog,
    private ngZone: NgZone
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
    console.log('onSubmit triggered.');
    if (this.form.invalid) {
      console.log('Form is invalid.');
      this.alertMessage = 'Por favor, completa todos los campos';
      this.showAlert = true;
      return;
    }

    this.isLoading = true;
    this.showAlert = false;

    const { email, password } = this.form.value;

    try {
      this.form.disable();
      console.log('Attempting signIn...');
      // Solo llamamos al servicio. La navegación se gestiona en AppComponent.
      await this.authService.signIn(email, password);
      console.log(
        'signIn successful. Navigation will be handled by AppComponent.'
      );
    } catch (error: any) {
      console.error('Authentication error:', error);
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

  async quickLogin(userKey: string) {
    const dialogRef = this.dialog.open(CodigoModalComponent);
    this.quickLoginFlag = true;

    const codigo = await dialogRef.afterClosed().toPromise();

    if (codigo === '2111') {
      let email = '';
      let password = '';

      switch (userKey) {
        case 'user1':
          email = 'test@example.com';
          password = 'Test123456';
          break;
        case 'user2':
          email = 'test2@example.com';
          password = 'Password2';
          break;
        case 'user3':
          email = 'test3@example.com';
          password = 'Password3';
          break;
        default:
          alert('Clave de usuario inválida.');
          return;
      }

      this.form.patchValue({ email, password });
      this.quickLoginFlag = false;

      await this.onSubmit();
    } else if (codigo) {
      alert('Código incorrecto');
    }
  }
}
