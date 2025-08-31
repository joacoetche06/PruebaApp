// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  host: { class: 'ion-page' }, // <-- AGREGAR
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  error: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService,
    private authService: AuthService
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

  async onSubmit(): Promise<void> {
    this.error = null;
    if (this.form.invalid) return;

    const { email, password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.isLoading = true;
    try {
      this.form.disable();
      const result = await this.authService.signUp(email, password);
      this.snackbarService.showMessage(
        `¡Registro exitoso! Verifica tu email: ${email}`,
        'success'
      );
      (document.activeElement as HTMLElement | null)?.blur();
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.error = error.message || 'Error en el registro';
    } finally {
      this.form.enable();
      this.isLoading = false;
    }
  }

  goToLogin(event: Event) {
    event.preventDefault();
    (document.activeElement as HTMLElement | null)?.blur();
    this.router.navigate(['/login']);
  }
}
