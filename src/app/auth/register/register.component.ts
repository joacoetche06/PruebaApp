// src/app/auth/register/register.component.ts
import { Component, OnDestroy, OnInit, ApplicationRef } from '@angular/core'; // Importar ApplicationRef
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
  IonSpinner,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  standalone: true,
  host: { class: 'ion-page' }, // <-- AGREGAR
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonLabel,
    IonInput,
    IonButton,
    IonItem,
    IonAlert,
    IonSpinner,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private appRef: ApplicationRef // Inyectar ApplicationRef
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$'),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log('RegisterComponent: ngOnInit');
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.alertMessage = 'Por favor, completa todos los campos correctamente.';
      this.showAlert = true;
      return;
    }

    const { email, password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      this.alertMessage = 'Las contraseñas no coinciden.';
      this.showAlert = true;
      return;
    }

    this.isLoading = true;
    this.showAlert = false;

    try {
      this.form.disable();
      const result = await this.authService.signUp(email, password);
      // Podrías usar Ion-toast o un Ion-alert para mostrar un mensaje de éxito
      this.alertMessage = '¡Registro exitoso! Ahora puedes iniciar sesión.';
      this.showAlert = true;

      await this.router.navigate(['/auth/login']);
      this.appRef.tick();
    } catch (error: any) {
      this.alertMessage =
        error.message || 'Error en el registro. Intenta nuevamente.';
      this.showAlert = true;
    } finally {
      this.form.enable();
      this.isLoading = false;
    }
  }

  onAlertDismiss() {
    this.showAlert = false;
  }

  ngOnDestroy() {
    console.log('RegisterComponent: ngOnDestroy');
  }
}
