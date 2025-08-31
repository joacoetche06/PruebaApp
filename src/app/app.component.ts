// app.component.ts

import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router) {
    this.initialize();
    addIcons({
      'home-outline': homeOutline,
      'list-outline': listOutline,
      'person-outline': personOutline,
    });
  }

  async initialize() {
    await this.platform.ready();

    // Simula una carga o espera breve para que la UI se renderice
    setTimeout(async () => {
      // Oculta el splash screen de forma controlada
      await SplashScreen.hide({ fadeOutDuration: 300 });
      // Navega una vez que la transición esté completa
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }, 500); // Espera 500ms para asegurar la transición
  }
}
