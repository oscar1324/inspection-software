import { Component,Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';



@Component({
  selector: 'app-kpi-porcentaje-card',
  templateUrl: './kpi-porcentaje-card.html',
  styleUrl: './kpi-porcentaje-card.css',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    BaseChartDirective
    
    ],
})
export class KpiPorcentajeCard  implements OnInit, OnChanges{

  @Input() title: string = 'KPI Gráfico';
  @Input() valueActual: number = 0;
  @Input() max:number = 0;
  @Input() unit: string = '%';
  @Input() num1: number = 0;
  @Input() num2: number = 0;

  porcentaje: number = 0;
  porcentajeRedondeado: number = 0;
  porcentajeRestante: number = 0;
  
  
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
      backgroundColor: ['#21b5daff', '#6b6d6eff'], //#17B37B - #3C4045
      hoverBackgroundColor: ['#21b5daff','#6b6d6eff'],
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
    if (changes['valueActual'] || changes['max'] || changes['num1'] || changes['num2']) {
      this.updateChartData();
    }
      
  }

  private updateChartData(): void {
    

    // 1. Crear los porcentajes
    if(this.max > 0){
      this.porcentaje = (this.valueActual / this.max) * 100;
      this.porcentajeRestante = 100 - this.porcentaje;

      this.porcentajeRedondeado = Math.round(this.porcentaje);
    } else {
      this.porcentaje = 0;
      this.porcentajeRestante = 100;
    }
    

    // 2. Asignar porcentajes al gráfico
    this.doughnutData.labels = [];
    this.doughnutData.datasets[0].data = [this.porcentaje, this.porcentajeRestante];

    // 3. Redibujar gráfico si ya esta renderizado
    if(this.chart){
      this.chart.update();
    }

  }
}
