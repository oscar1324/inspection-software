import { Component,Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Inspection } from '../models/inspection.model';
import { WindFarm } from '../models/windfarm.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'; 
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { NewWindFarmDialog } from '../dialogs/new-wind-farm-dialog/new-wind-farm-dialog';
import { DeleteWindFarmDialog } from '../dialogs/delete-wind-farm-dialog/delete-wind-farm-dialog';
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
export class TableCard implements OnInit, OnChanges{

  // Almacenar el array de datos que le pasemos
  @Input() almacenDatosWindFarm: WindFarm[] = [];
  @Input() almacenDatosInspecciones: Inspection[] = [];
  @Input() title: String = "Titulo";

  @Input() mostrar: boolean = false;
  @Input() opcion: number = 0;

  windFarmMap: { [id:number]: string} = {};

  constructor(public dialog: MatDialog){}
  
  ngOnInit(): void {

    this.crearMapa();

    
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['almacenDatosWindFarm'] ) {
      console.log('El array de almacenDatosWindFarm ha cambiado:', changes['almacenDatosWindFarm'].currentValue);
      this.crearMapa();

    }

    if(changes['almacenDatosInspecciones'] ) {
      console.log('El array de almacenDatosInspecciones ha cambiado:', changes['almacenDatosInspecciones'].currentValue);
        
    }
  }

  crearMapa(): void {
    console.error("AQUI SE EJECUTA");
    this.windFarmMap =  {};
      if(this.almacenDatosInspecciones && this.almacenDatosWindFarm.length > 0){
        this.almacenDatosWindFarm.forEach(parque => {
        this.windFarmMap[parque.id] = parque.name;
        
      })

    }
      
  }

  getWindFarm(id:number): string {
    return this.windFarmMap[id] || 'sin nombre';
  }


  openDialog(): void {
    this.dialog.open(NewWindFarmDialog, {
      width: '700px',
      panelClass: 'dialogo-personalizado'
    })
  }

  openDialogToDelete(id: number ,name: any):void {
    this.dialog.open(DeleteWindFarmDialog, {
      width: '700px',
      data: {
        id: id,
        nameWindFarm: name
      }
    });
  }



  viewDetailWindFarm(): void {
    console.log("Redirecciona a otra vista");
  }
  

}
