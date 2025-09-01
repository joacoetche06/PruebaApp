// app.component.ts

import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, personOutline } from 'ionicons/icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform, public router: Router) {
    this.initialize();
    addIcons({
      'home-outline': homeOutline,
      'list-outline': listOutline,
      'person-outline': personOutline,
    });

    // --- INICIO DEL CÓDIGO DE DEPURACIÓN ---
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Router Event: NavigationStart', event.url);
      }
      if (event instanceof NavigationEnd) {
        console.log('Router Event: NavigationEnd', event.url);
      }
      if (event instanceof NavigationCancel) {
        console.log('Router Event: NavigationCancel', event);
      }
      if (event instanceof NavigationError) {
        console.log('Router Event: NavigationError', event);
      }
    });
    // --- FIN DEL CÓDIGO DE DEPURACIÓN ---
  }

  async initialize() {
    await this.platform.ready();

    // Simplemente oculta el splash nativo después de un momento.
    // El router se encargará de mostrar el splash web.
    setTimeout(async () => {
      await SplashScreen.hide({ fadeOutDuration: 300 });
    }, 500);
  }
  // ...existing code... }
}
