
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
  @Input() num1!: number; // Total aerogeneradores pilotados
  @Input() num2!: number; // total aerogeneradores inspeccionados

  unit: string = '%';
  porcentaje!: number;
  porcentajeRedondeado!: number;
  porcentajeRestante!: number;
  stateDataFromDad: boolean = false;
  colorGrafico: string = '#21b5daff';
  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  //1. Configuración general del gráfico
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
      backgroundColor: [ this.colorGrafico, '#6b6d6eff'],
      hoverBackgroundColor: ['#21b5daff','#618597ff'],
      borderWidth: 0.5,
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
    if (changes['valueActual']|| changes['num1'] || changes['num2']) {
      this.updateChartData();
      
      const newValorNum1 = this.num1;
      const newValorNum2 = this.num2;
      console.warn("CAMBIA ESTADO VALOR  -> newValor1: ", newValorNum1 , " / newValor2: ", newValorNum2);
    }

    if (changes['porcentajeRedondeado']) {
      console.error("VALOR DE PORCENTAGE CAMBIA -> ", this.porcentajeRedondeado);

      if(this.porcentaje == 100) {
        console.error("Se ha completado el parquee");
      }
    }
      
  }

  private updateChartData(): void {

    // 1. Crear los porcentajes
    if(this.num2 > 0){
      this.porcentaje = (this.valueActual / this.num2) * 100;
      this.porcentajeRestante = 100 - this.porcentaje;
      this.porcentajeRedondeado = Math.round(this.porcentaje);

    } else {
      this.porcentaje = 0;
      this.porcentajeRestante = 100;
    }
  
    // 2. Asignar porcentajes al gráfico
    this.doughnutData.labels = [];
    this.doughnutData.datasets[0].data = [this.porcentaje, this.porcentajeRestante];
    console.log("PORCENTAJE----- : " , this.doughnutData.datasets[0].data[0]);
    if(this.doughnutData.datasets[0].data[0] == 100) {
      this.doughnutData.datasets[0].backgroundColor = "#17B37B";
    }

    // 3. Redibujar gráfico si ya esta renderizado
    if(this.chart){
      this.chart.update();
    }

  }

}
