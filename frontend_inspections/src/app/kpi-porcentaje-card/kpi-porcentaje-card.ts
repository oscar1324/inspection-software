import { Component,Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
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
    BaseChartDirective,
    MatCardModule
    
    ],
})
export class KpiPorcentajeCard  implements OnChanges{

  @Input() title: string = 'KPI Gráfico';
  @Input() valueActual!: number ;
  @Input() max!:number;
  @Input() unit: string = '%';
  @Input() num1!: number;
  @Input() num2!: number;

  porcentaje!: number;
  porcentajeRedondeado!: number;
  porcentajeRestante!: number;
  stateDataFromDad: boolean = false;
  
  
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
      console.warn("--- AL INICIAR COMPONENTE ESTOS SON LOS DATOS ---");
      console.warn("--- Aerogeneradores pilotados: ", this.num1);
      console.warn("--- Aerogeneradores totales inspeccionados: ", this.num2);
      setTimeout(() => {
      console.warn("--- Aerogeneradores pilotados: ", this.num1);
      console.warn("--- Aerogeneradores totales inspeccionados: ", this.num2);
    }, 3000);
      console.warn("-------------------------------------------------");
      this.updateChartData();
  }

  // Se redibuja el gráfico cada vez que un valor cambia 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valueActual'] || changes['max'] || changes['num1'] || changes['num2']) {
      this.updateChartData();
      
      const newValorNum1 = this.num1;
      const newValorNum2 = this.num2;
      console.warn("CAMBIA ESTADO VALOR  -> newValor1: ", newValorNum1 , " / newValor2: ", newValorNum2);
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
