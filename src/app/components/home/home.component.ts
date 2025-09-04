// src/app/home.component.ts
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  IonContent,
  IonButton,
  IonText,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  host: { class: 'ion-page' },
  imports: [IonContent, IonButton, IonItem, IonLabel, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any = null;
  userEmail: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.userEmail = this.user ? this.user.email : null;
    console.log('HomeComponent: ngOnInit');
  }

  async logout() {
    console.log('Logout triggered.');
    try {
      // Solo llamamos al servicio. La navegación se gestiona en AppComponent.
      await this.authService.signOut();
      console.log(
        'signOut successful. Navigation will be handled by AppComponent.'
      );
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
