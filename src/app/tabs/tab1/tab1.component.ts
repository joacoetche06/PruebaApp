import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonToast,
  ],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  public nombre: string;
  public apellido: string;
  public mostrar: boolean;
  public direccion: string;

  constructor(public navCtrl: NavController) {
    this.nombre = '';
    this.apellido = '';
    this.mostrar = false;
    this.direccion = '';
  }

  MostrarDatos(nombre: any, apellido: any) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mostrar = true;
  }
}
