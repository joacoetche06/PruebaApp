import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [IonRouterOutlet],
  template: '<ion-router-outlet></ion-router-outlet>',
})
export class AuthenticatedLayoutComponent {}
