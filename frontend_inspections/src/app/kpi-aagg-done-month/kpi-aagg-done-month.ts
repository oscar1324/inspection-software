import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input , OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Chart, registerables } from 'chart.js';
import { InspectionsService } from '../services/InspectionsService';



Chart.register(...registerables);

@Component({
  selector: 'app-kpi-aagg-done-month',
  imports: [CommonModule, MatCardModule],
  templateUrl: './kpi-aagg-done-month.html',
  styleUrl: './kpi-aagg-done-month.css'
})
export class KpiAaggDoneMonth implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('myBarGraphic') myBarGraphic!: ElementRef<HTMLCanvasElement>;
  @Input() title: string = "Titulo";
  @Input() ejeX: any [] = [];
  @Input() ejeY:any[] = [];
  @Input() etiqueta: string = "---";

  private chartInstancia: any;
  @Input() minValue = 0;
  @Input() maxValue = 0;
  @Input() stepSize = 0;

  constructor(
    private inspectionService: InspectionsService
  ) {

  }

  ngOnInit(): void {
    
  }

  
  ngOnChanges(changes: SimpleChanges): void {

    
  }

  ngAfterViewInit(): void {

    this.createBarGraphic();
    this.chartInstancia.update();
  }

  createBarGraphic(): void {

    if(this.title == 'Salarios 2025') {

      this.ejeX =  ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre'];
      this.ejeY = [1433,1433,1433,1509,1771,1902,2466,2008];
    }

    const total = this.ejeY.reduce((acumulador, valor) => acumulador + valor, 0);
    const media = Math.round(total / this.ejeY.length);
    const lineaMedia =  new Array( this.ejeY.length + 1).fill(media)

    console.log('Total -> ', total, ' - dividido entre -> ', this.ejeY.length, ' - Media -> ', media);
    
    const canvas = this.myBarGraphic.nativeElement;
    this.chartInstancia = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [...this.ejeX, ''],
        datasets: [
          {
          data: [...this.ejeY, null],
          backgroundColor: '#21b5daff',
          borderWidth: 2,
          hoverBackgroundColor: '#0077b6',
          borderRadius: 5,
          barThickness: 65,
          order: 2
          },

          {
          type: 'line',
          data: [...this.ejeY, null],
          borderColor: 'red',
          borderWidth: 2,
          pointRadius: 4,
          order:1
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { 
            grid: { display: false, },
            ticks: {
              font: {
                size: 13,
              },
            }
            
          },
          y: {
            
            min: this.minValue,
            max: this.maxValue,
            ticks: {
              stepSize: this.stepSize,
              font: {
                size: 14,
              },
              callback: (value: string | number) =>  + value + this.etiqueta
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                let label = context.dataset.label || '';
                if (label) { label += ': '; }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('es-ES').format(context.parsed.y) + this.etiqueta;
                }
                return label;
              }
            }
          },
        }
      }
    });
  }
}
