import { Component, OnInit, Input } from '@angular/core';
import { MatCardHeader, MatCardContent, MatCardModule } from '@angular/material/card';
import { InspectionsService } from '../services/InspectionsService';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-kpi-extra-month',
  imports: [
    MatCardModule,
    DecimalPipe,
    
],
  templateUrl: './kpi-extra-month.html',
  styleUrl: './kpi-extra-month.css'
})
export class KpiExtraMonth implements OnInit{

  @Input()titulo: string = "Titulo";
  netoExtraGenerado: number = 0;
  porcentage: number = 0;

  constructor(
    private inspectionService: InspectionsService
  ){

  }

  ngOnInit(): void {
      this.inspectionService.getTotalNetExtraCountMonth().subscribe( {
      next: (result) => {
        this.netoExtraGenerado = result.total_net_extra_count_month;
        this.calculoPorcentage(this.netoExtraGenerado);
        console.log("OBTENCIÓN DATOS BACK-END: ", this.netoExtraGenerado);
      },
      error: (err) => {
        console.error("Se ha producido un error en la petición de obtención de ingresos extra netos por mes ->", err);
      }
      });
  }

  calculoPorcentage(netoExtraGenerado: number): void {

    const sueldo_base = 1430;

    this.porcentage = (netoExtraGenerado / sueldo_base) * 100;

    

  }
  

}
