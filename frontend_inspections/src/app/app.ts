import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { InspectionsService } from './services/InspectionsService';
import { Inspection } from './models/inspection.model';
import { WindFarm } from './models/windfarm.model';
import { TotalCountWTGPiloted } from './models/total-wtg-pilotados.model'
import { MatCard } from "@angular/material/card";
import { MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { MatCardContent } from "@angular/material/card";

import { KpiPorcentajeCard } from './kpi-porcentaje-card/kpi-porcentaje-card';
import { TableCard } from './table-card/table-card';


import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterOutlet, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'Dashboard de Inspecciones Eólicas campaña 2025';
  inspections: Inspection[] = [];
  windFarms: WindFarm[] = [];
  totalCountWTGPiloted: number = 0;
  totalCountWTGInspections: number = 0;
  loading:boolean = false;
  error: string | null = null;

  constructor(
    private inspectionService: InspectionsService, 
    private cdr: ChangeDetectorRef,
    private router: Router
    ){}


  ngOnInit(): void {
      this.loadInspection();
      this.loadTotalCountWTGPiloted();
      this.loadTotalCountWTGInspections();
      this.loadWindFarm();
  }
  

  loadInspection(): void {
    this.loading = true;
    this.error= null;
    
    this.inspectionService.getAllInspections().subscribe({
      next: (data: Inspection[]) => {
        this.inspections = data;

        this.inspections.sort((a,b) => {
          const comparacionAero = b.number_wind_turbines_generators - a.number_wind_turbines_generators;
          
          if(comparacionAero !== 0){
            return comparacionAero;
          }

          const fecha1 = new Date(a.date);
          const fecha2 = new Date(b.date);

          return fecha2.getTime() - fecha1.getTime();

          
        });

        this.loading = false;
        console.log('Datos de inspecciones recibidos: ', this.inspections);
      },
      error: (err) => {
        this.error = 'Error al cargar las inspecciones: ' + (err.mess || err.statusText)
        this.loading = false;
        console.error('Se ha producido un error: ' , err);
      },
      complete: () => {
        console.warn(' -> Petición de inspecciones completada.');
      }
    })
  }

  loadTotalCountWTGPiloted(): void {
    console.log("EJECUCIÓN DEL MÉTODO");
    this.inspectionService.getTotalWTGPiloted().subscribe({
      next: (data) => {
        
        this.totalCountWTGPiloted = data.totalCount_wtg_piloted_by_me;
        console.log("Total Aerogeneradores inspeccionados durante campaña 2025 -> ", data.totalCount_wtg_piloted_by_me);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar las conteo total inspecciones realizadas: ' + (err.mess || err.statusText)
        console.error('Se ha producido un error: ' , err);
      },
      complete: () => {
        console.warn('Petición de cantidad total de aerogeneradores inspeccionados completado.');
      }
    })
  }

  loadTotalCountWTGInspections(): void {
    this.inspectionService.getTotalWTGInspections().subscribe({
      next: (data) => {
        this.totalCountWTGInspections = data.totalCount_wtg_inspections;
        console.log('Aerogeneradores inspeccionados durante campaña 2025 ->', data.totalCount_wtg_inspections);
         this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar las conteo total de aerogeneradores inspeccionados: ' + (err.mess || err.statusText)
        console.error('Se ha producido un error: ' , err);
      },
      complete: () => {
        console.warn('Petición de cantidad total de aerogeneradores inspeccionados durante campaña 2025');
      }
    })
  }

  loadWindFarm(): void {
    console.log("SE EJECUTAAAAAAAAAAAAAAAAAAA");
    this.inspectionService.getAllWindFarm().subscribe({
      
      next: (data: WindFarm[]) => {
        this.windFarms = data;
      },
      error: (err) => {
        this.error = 'Error al cargar todos los parques eólicos: ' + (err.mess || err.status1)
        console.error('Se ha producido un error: ' , err);
      },
      complete: () => {
        console.warn(' -> Petición de listar todos los parques eólicos completada');
      }
    })
  }
}
