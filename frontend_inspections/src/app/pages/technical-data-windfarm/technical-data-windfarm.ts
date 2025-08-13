
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { InspectionsService } from '../../services/InspectionsService';
import { Inspection } from '../../models/inspection.model';
import { WindFarm } from '../../models/windfarm.model';
import { TotalCountWTGPiloted } from '../../models/total-wtg-pilotados.model';
import { MatCard } from "@angular/material/card";
import { MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import { MatCardContent } from "@angular/material/card";
import { KpiPorcentajeCard } from '../../kpi-porcentaje-card/kpi-porcentaje-card';
import { TableCard } from '../../table-card/table-card';
@Component({
  selector: 'app-technical-data-windfarm',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButtonModule,
    TableCard,
    KpiPorcentajeCard
  ],
  templateUrl: './technical-data-windfarm.html',
  styleUrl: './technical-data-windfarm.css'
})
export class TechnicalDataWindfarm implements OnInit {


  name: string = '';
  location: string = '';
  province: string = '';
  country: string = '';
  client: string = '';
  total_aagg: number = 0;
  type_blade: string = '';
  datosRecibidos: any;

  constructor(private router: Router){
    // Accedemos al objeto state del historial de navegación
    const navigation = this.router.getCurrentNavigation();
    this.datosRecibidos = navigation?.extras.state?.['data'];
  }

  ngOnInit(): void {
    console.log("Datos recibidos por navegación -> ", this.datosRecibidos);

    this.asignarDatosNavegacion();
    
  }

  asignarDatosNavegacion(): void {
    this.name = this.datosRecibidos.name;
    this.location = this.datosRecibidos.location;
    this.province = this.datosRecibidos.province;
    this.country = this.datosRecibidos.country;
    this.client = this.datosRecibidos.client;
    this.type_blade = this.datosRecibidos.type_blade;

    console.log('NOMBRE : ' , this.name);
  }

}
