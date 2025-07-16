import { Component,Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';



@Component({
  selector: 'app-kpi-porcentaje-card',
  templateUrl: './kpi-porcentaje-card.html',
  styleUrl: './kpi-porcentaje-card.css',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    NgChartsModule
    ],
})
export class KpiPorcentajeCard  implements OnInit, OnChanges{

  @Input() title: string = 'KPI Gráfico';
  @Input() valueActual: number = 0;
  @Input() max:number = 0;
  @Input() unit: string = '%';
  @Input() etiqueta1: string = "Inspeccionados"
  @Input() etiqueta2: string = 'Total';
  
  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  //1. Opciones generales del gráfico
  public doughnutOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false},
      tooltip: { enabled: false}
    }
  }

  //2. Datos del gráfico
  public doughnutData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#159bbdff', '#6b6d6eff'], //#17B37B - #3C4045
      hoverBackgroundColor: ['#17B37B','#6b6d6eff'],
      borderWidth: 0,
      rotation: -90,
      circumference: 180

    }]
  }

  // 3. Tipo de gráfico
  public doughnutType: ChartType  = 'doughnut';

  // Se dibuja gráfico al inicio
  ngOnInit(): void {
      this.updateChartData();
  }

  // Se redibuja el gráfico cada vez que un valor cambia 
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['valueActual'] || changes['max']){

    }
      
  }

  private updateChartData(): void {

    // 1. Crear los porcentajes
    const porcentaje = (this.valueActual / this.max) * 100;
    const porcentajeRestante = 100 - porcentaje;

    // 2. Asignar porcentajes al gráfico
    this.doughnutData.labels = [this.etiqueta1, this.etiqueta2];
    this.doughnutData.datasets[0].data = [porcentaje, porcentajeRestante];

    // 3. Redibujar gráfico si ya esta renderizado
    if(this.chart){
      this.chart.update();
    }

  }
}
