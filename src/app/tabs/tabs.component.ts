// src/app/tabs/tabs.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
  ],
  template: `
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" [routerLink]="['/tabs/tab1']">
          <ion-icon name="home-outline"></ion-icon>
          <ion-label>Tab1</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" [routerLink]="['/tabs/tab2']">
          <ion-icon name="list-outline"></ion-icon>
          <ion-label>Tab2</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" [routerLink]="['/tabs/tab3']">
          <ion-icon name="person-outline"></ion-icon>
          <ion-label>Tab3</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
})
export class TabsComponent {}
