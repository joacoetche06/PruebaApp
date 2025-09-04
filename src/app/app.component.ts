// app.component.ts

import { Component, NgZone } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, personOutline } from 'ionicons/icons';
import { SupabaseService } from './services/supabase.service';
import { AuthService } from './services/auth.service'; // Importar AuthService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private supabase: SupabaseService,
    private ngZone: NgZone,
    private authService: AuthService // Inyectar AuthService
  ) {
    this.initialize();
    addIcons({
      'home-outline': homeOutline,
      'list-outline': listOutline,
      'person-outline': personOutline,
    });

    // Escuchar los eventos de nuestro servicio de autenticación
    this.authService.authState$.subscribe((state) => {
      this.ngZone.run(() => {
        if (state === 'SIGNED_IN') {
          this.router.navigate(['/home']);
        } else if (state === 'SIGNED_OUT') {
          this.router.navigate(['/auth/login']);
        }
      });
    });
  }

  async initialize() {
    await this.platform.ready();

    // Simplemente oculta el splash nativo después de un momento.
    // El router se encargará de mostrar el splash web.
    setTimeout(async () => {
      await SplashScreen.hide({ fadeOutDuration: 300 });
    }, 500);
  }
}
