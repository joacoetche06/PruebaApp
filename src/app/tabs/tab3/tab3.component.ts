import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonItem, // Agregado por si acaso necesitas ion-item
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab3',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton,
    // IonItem solo si lo usas en otras partes del template
  ],
  templateUrl: './tab3.page.html', // o tab3.component.html
  styleUrls: ['./tab3.page.scss'], // o tab3.component.scss
})
export class Tab3Page {
  public mi_color: string;

  constructor() {
    this.mi_color = '';
  }

  CambiarColor(color: string) {
    this.mi_color = color;
  }
}
