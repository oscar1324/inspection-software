
import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs'; // ✅ Importa forkJoin y Observable

import { InspectionsService } from '../../services/InspectionsService';
import { Inspection } from '../../models/inspection.model';
import { WindFarm } from '../../models/windfarm.model';
import { TotalCountWTGPiloted } from '../../models/total-wtg-pilotados.model';
import { MatCard } from "@angular/material/card";
import { MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import { MatCardContent } from "@angular/material/card";
import { KpiPorcentajeCard } from '../../kpi-porcentaje-card/kpi-porcentaje-card';
import { TableCard } from '../../table-card/table-card';
import { KpiExtraMonth } from '../../kpi-extra-month/kpi-extra-month';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatCard, MatCardHeader, KpiPorcentajeCard, TableCard, KpiExtraMonth],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  protected title = 'Dashboard de Inspecciones Eólicas campaña 2025';
  inspections: Inspection[] = [];
  windFarms: WindFarm[] = [];
  totalCountWTGPiloted!: number;
  totalCountWTGInspections!: number;
  loading:boolean = false;
  error: string | null = null;
  stateDataLoad: boolean = false;

  datoGeneracionExtra: number = 0;
  month: string = "month";

  constructor(
    private inspectionService: InspectionsService,
    private changeDetector: ChangeDetectorRef
  ){}


  ngOnInit(): void {
    this.loading = true;
    this.loadAllRequestHTTP();

      this.inspectionService.getTotalNetExtraCountMonth().subscribe( {
      next: (result) => {
        
        this.datoGeneracionExtra = result.total_net_extra_count_month;
        this.month = result.month;
        this.traducir(this.month);
        this.changeDetector.detectChanges();
      },
      error: (err) => {
        console.error("Se ha producido un error en la petición de obtención de ingresos extra netos por mes ->", err);
      }
      });

  }

  traducir(mes_a_traducir: string): void {

    if(mes_a_traducir == "September"){
      this.month = "Septiembre"
    } else if(mes_a_traducir == "October") {
      this.month = "Octubre"
    } else if(mes_a_traducir == "November") {
      this.month = "Noviembre"
    } else if(mes_a_traducir == "December") {
      this.month = "Diciembre"
    } else {
      this.month = "Traducir mes"
    }

  }
  
  loadAllRequestHTTP(): void {

    forkJoin({
      totalPiloted: this.inspectionService.getTotalWTGPiloted(),
      totalInspections: this.inspectionService.getTotalWTGInspections(),
      windFarmsObject: this.inspectionService.getAllWindFarm(),
      inspectionObject: this.inspectionService.getAllInspections()
    }).subscribe({

      next: (results) => {

        this.totalCountWTGPiloted = results.totalPiloted.totalCount_wtg_piloted_by_me;
        this.totalCountWTGInspections = results.totalInspections.totalCount_wtg_inspections;
        this.windFarms = results.windFarmsObject;
        this.inspections = results.inspectionObject;
          
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
        this.stateDataLoad = true;
        this.changeDetector.detectChanges();

      },

      error: (err) => {
          console.error("¡Se ha producido un error en la obtención de datos totales pilotados-inspeccionados! ->", err);
      },

      complete: () => {
          console.warn("¡Se han completado con exito la obtención de datos pilotados-inspeccionados!");
          
      }
    })


  }

}

