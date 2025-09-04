import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-codigo-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './codigo-modal.component.html',
  styleUrl: './codigo-modal.component.css'
})
export class CodigoModalComponent {
  codigo: string = '';

  constructor(public dialogRef: MatDialogRef<CodigoModalComponent>) {}

  enviar() {
    this.dialogRef.close(this.codigo);
  }

  cerrar() {
    this.dialogRef.close();
  }
}
