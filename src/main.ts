import { bootstrapApplication } from '@angular/platform-browser';
// CAMBIO: Importa withComponentInputBinding
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    // CAMBIO: Usa la configuración completa para el router
    provideRouter(routes, withComponentInputBinding()),
    // CAMBIO: Asegúrate que provideIonicAngular esté configurado así
    provideIonicAngular({}),
  ],
});
