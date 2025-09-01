import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, IonContent],
  template: `
    <ion-content class="ion-padding">
      <router-outlet></router-outlet>
    </ion-content>
  `,
})
export class AuthLayoutComponent {}
