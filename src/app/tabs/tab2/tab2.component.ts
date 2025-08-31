import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonLabel,
  IonChip,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonLabel,
    IonChip,
    IonItem,
    IonButton,
  ],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  public mi_avatar: string;

  constructor() {
    this.mi_avatar = '';
    this.GenerarAvatar();
  }

  GenerarAvatar() {
    const valor: number = Date.now();
    const cadena: string = valor.toString() + '?d=identicon&f=y';

    this.mi_avatar = `https://www.gravatar.com/avatar/${cadena}`;
  }
}
