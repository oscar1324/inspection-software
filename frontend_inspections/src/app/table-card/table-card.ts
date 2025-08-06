import { Component,Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Inspection } from '../models/inspection.model';
import { WindFarm } from '../models/windfarm.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'; 
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { NewWindFarmDialog } from '../new-wind-farm-dialog/new-wind-farm-dialog';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-table-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
    
  ],
  templateUrl: './table-card.html',
  styleUrl: './table-card.css'
})
export class TableCard {

  // Almacenar el array de datos que le pasemos
  @Input() almacenDatosWindFarm: WindFarm[] = [];
  @Input() almacenDatosInspecciones: Inspection[] = [];
  @Input() title: String = "Titulo";

  @Input() mostrar: boolean = false;

  constructor(public dialog: MatDialog){}
  
  ngOnInit(): void {
    
  }

  openDialog(): void {
    this.dialog.open(NewWindFarmDialog, {
      width: '700px',
      panelClass: 'dialogo-personalizado'
    })
  }


  viewDetailWindFarm(): void {
    console.log("Redirecciona a otra vista");
  }
  

}
