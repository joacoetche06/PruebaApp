import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      IonicModule.forRoot({
        mode: 'md', // o 'ios' dependiendo del diseño que prefieras
      }),
      FormsModule
    ),
  ],
};
