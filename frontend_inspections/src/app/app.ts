import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';


import { InspectionsService } from './services/InspectionsService';
import { Inspection } from './models/inspection.model';
import { TotalCountWTGPiloted } from './models/total-wtg-pilotados.model'
import { MatCard } from "@angular/material/card";
import { MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import { MatCardContent } from "@angular/material/card";
import { KpiPorcentajeCard } from './kpi-porcentaje-card/kpi-porcentaje-card';
import { TableCard } from './table-card/table-card';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables); // <--- ¡AÑADE ESTAS DOS LÍNEAS!

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterOutlet, CommonModule, MatButtonModule, MatCard, MatCardHeader, KpiPorcentajeCard, TableCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'Dashboard de Inspecciones Eólicas campaña 2025';
  inspections: Inspection[] = [];
  totalCountWTGPiloted: number = 0;
  totalCountWTGInspections: number = 0;
  loading:boolean = false;
  error: string | null = null;

  constructor(private inspectionService: InspectionsService, private cdr: ChangeDetectorRef){}


  ngOnInit(): void {
      this.loadInspection();
      this.loadTotalCountWTGPiloted();
      this.loadTotalCountWTGInspections();
  }
  

  loadInspection(): void {
    this.loading = true;
    this.error= null;
    
    this.inspectionService.getAllInspections().subscribe({
      next: (data: Inspection[]) => {
        this.inspections = data;
        this.loading = false;
        console.log('Datos de inspecciones recibidos: ', this.inspections);
      },
      error: (err) => {
        this.error = 'Error al cargar las inspecciones: ' + (err.mess || err.statusText)
        this.loading = false;
        console.error('Se ha producido un error: ' , err);
      },
      complete: () => {
        console.log('Petición de inspecciones completada.');
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
        console.log('Petición de cantidad total de aerogeneradores inspeccionados completado.');
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
        console.log('Petición de cantidad total de aerogeneradores inspeccionados durante campaña 2025');
      }
    })
  }

  // TODO EJECUTAR ESTOS MÉTODOS AL INICIO DE LA PAGINA NGONINIT
}
