import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-custom-splash',
  templateUrl: './custom-splash.component.html',
  styleUrls: ['./custom-splash.component.scss'],
  standalone: true,
  imports: [IonContent, IonSpinner, CommonModule],
})
export class CustomSplashComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      // Navega a la página principal después de 3 segundos
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }, 3000);
  }
}
