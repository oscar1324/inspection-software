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
import { Router } from '@angular/router';
import { NewRegisterInspectionDialog } from '../dialogs/new-register-inspection-dialog/new-register-inspection-dialog';


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
  @Input() almacenDatosInspeccionesById: Inspection[] = [];

  @Input() title: String = "Titulo";

  @Input() mostrar: boolean = false;
  @Input() opcion: number = 0;
  @Input() idObtenido: number = 0;

  id_obtenido: number = 0;
  arrayInspeccionporID: Inspection[] =  [];

  windFarmMap: { [id:number]: string} = {};
  country: string = "";

  constructor(
    public dialog: MatDialog,
    private router: Router // Inyectamos el router
  ){}
  
  ngOnInit(): void {

    this.crearMapa();

    // TODO - AL INICIARSE PETICION HTTP INTRODUCIENDO IDOBTENIDO y guardando datos por parque eolico

    
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['almacenDatosWindFarm'] ) {
      console.log('El array de almacenDatosWindFarm ha cambiado:', changes['almacenDatosWindFarm'].currentValue);
      this.crearMapa();
      this.almacenDatosWindFarm = this.almacenDatosWindFarm;
    }

    if(changes['almacenDatosInspecciones'] ) {
      console.log('El array de almacenDatosInspecciones ha cambiado:', changes['almacenDatosInspecciones'].currentValue);
        
    }

    if(changes['almacenDatosInspeccionesById']) {
      console.log('SE HA PRODUCIDO UN CAMBIO EN almacenDatosInspeccionesById:', changes['almacenDatosInspeccionesById'].currentValue);
      this.almacenDatosInspeccionesById = this.almacenDatosInspeccionesById;
    }


  }



  nextNavigation(id: number): void {
    console.warn('******************** ', this.almacenDatosWindFarm);
    const windFarmSeleccionado = this.almacenDatosWindFarm.find( //Busca por campo y enuentra todos los datos cuyo id sea x
      (parque) => parque.id === id 

    );



    if(windFarmSeleccionado){
      this.router.navigate(['/ficha-tecnica-windfarm', id], {
      state: {data: windFarmSeleccionado, id}
      });
    } else {
      console.error('No ha podido encontrar el parque eólico seleccionado');
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

  openDialogNewRegister(): void {
    console.error("ABRIENDO OPEN DIALOG");
    console.error(this.almacenDatosWindFarm);
    console.log("SE RECORRE FOR " , this.almacenDatosWindFarm.length);
    for(const parque of this.almacenDatosWindFarm) {
      console.log("SE RECORRE FOR");
      if(parque.id === this.idObtenido){
        console.log(parque.country);
      }
    }
    
    console.error(this.almacenDatosWindFarm[4]);
    this.dialog.open(NewRegisterInspectionDialog, {
      width: '700px',
      panelClass: 'dialogo-personalizado',
      data: {
        id: this.idObtenido
      }
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



  viewDetailWindFarm(id: number): void {
    console.log("Redirecciona a otra vista");
    this.nextNavigation(id);
    this.id_obtenido = id;
    console.error('ID OBTENIDO ES: ', this.id_obtenido);
  }
  

}
