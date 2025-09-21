import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardHeader, MatCardContent, MatCardModule } from '@angular/material/card';
import { InspectionsService } from '../services/InspectionsService';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-kpi-extra-month',
  imports: [
    MatCardModule,
    DecimalPipe,
    CommonModule
],
  templateUrl: './kpi-extra-month.html',
  styleUrl: './kpi-extra-month.css'
})
export class KpiExtraMonth implements OnInit{

  @Input() titulo: string = "Titulo";
  @Input() dato: number = 0;
  @Input() modalidad: number = 0;
  @Input() month: string = "month";
  @Input() total_calculo_porcentage: number = 0;


  porcentage: number = 0;

  constructor(
    private inspectionService: InspectionsService
  ){

  }

  ngOnInit(): void {
    

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dato'] ) {
      this.calculoPorcentage(this.dato, this.total_calculo_porcentage);
    }
      
  }

  calculoPorcentage(cantidad: number, total_calculo_porcentage: number): void {
    this.porcentage = (cantidad / total_calculo_porcentage) * 100;

  }
}
