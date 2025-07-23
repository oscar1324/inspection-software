import { Component,Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Inspection } from '../models/inspection.model';
import { WindFarm } from '../models/windfarm.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
    
  ],
  templateUrl: './table-card.html',
  styleUrl: './table-card.css'
})
export class TableCard {

  // Almacenar el array de datos que le pasemos
  @Input() almacenDatosWindFarm: WindFarm[] = [];
  @Input() almacenDatosInspecciones: Inspection[] = [];
  @Input() title: String = "Titulo";
  
  ngOnInit(): void {
    
  }


  viewDetailWindFarm(): void {
    console.log("Redirecciona a otra vista");
  }
  

}
