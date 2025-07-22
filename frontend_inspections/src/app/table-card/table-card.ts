import { Component,Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Inspection } from '../models/inspection.model';

@Component({
  selector: 'app-table-card',
  imports: [
    CommonModule,
    MatCardModule
    
  ],
  templateUrl: './table-card.html',
  styleUrl: './table-card.css'
})
export class TableCard {

  // Almacenar el array de datos que le pasemos
  @Input() almacenDatosArray: Inspection[] = [];
  @Input() title: String = "Titulo";
  
  ngOnInit(): void {
    console.error('Datos pasados a table-card ', this.almacenDatosArray);
  }
  

}
