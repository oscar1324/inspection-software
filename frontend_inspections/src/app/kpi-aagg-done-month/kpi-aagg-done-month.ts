import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input , OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Chart, registerables } from 'chart.js';
import { InspectionsService } from '../services/InspectionsService';
import { max } from 'rxjs';



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
  @Input() ejeYplusY:any[] = [];
  @Input() etiqueta: string = "---";
  @Input() modalidad: number = 0;
  @Input() estilo : number = 0;

  private chartInstancia: any;
  @Input() minValue = 0;
  @Input() maxValue = 0;
  @Input() stepSize = 0;

  ejeYNeto:any[] = [];
  ejeYplusYNeto:any[] = [];
  tendencaSuma: any[] = [];
  salario2023: any [] = [1313,1389,1389,1386,1386,1507,1447,1874,1429,1514,1525,1455];
  salario2024: any [] = [1408,1700,1425,1497,2000,1520,1503,1592,1483,1349,1664,1537];
  salario2025: any [] = [1433,1433,1433,1509,1771,1902,2466,2008, 2656];

  media2023: number = 0;
  media2024: number = 0;
  media2025: number = 0;

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
    let neto_indice: number = 0;
    console.warn('ANTES ejeYNeto' , this.ejeYNeto);
    if(this.ejeY.length > 0 && this.ejeYplusY.length) {
      console.warn("¡SE CUMPLE CONDICION!");
      this.ejeYNeto = this.ejeY.map( value => Math.round(value * 0.8));
      this.ejeYplusY = this.ejeYplusY.map(value => Math.round(value * 0.8));


    }
  console.warn('ejeYNeto' , this.ejeYNeto);

    if(this.title == 'Salarios') {

      this.ejeX =  ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      this.ejeY = this.salario2025;

      this.media2023 = this.salario2023.reduce((acumulador, acc) => acumulador + acc) / this.salario2023.length;
      this.media2024 = this.salario2024.reduce((acumulador, acc) => acumulador + acc) / this.salario2024.length;
      this.media2025 = this.salario2025.reduce((acumulador, acc) => acumulador + acc) / this.salario2025.length;

      console.warn(' --- Medias anuales ---');
      console.warn(' --- Media 2023: ' , Math.round(this.media2023) , '€');
      console.warn(' --- Media 2024: ' , Math.round(this.media2024) , '€');
      console.warn(' --- Media 2025: ' , Math.round(this.media2025) , '€');
      console.warn(' ----------------------');
    } 
    
    const canvas = this.myBarGraphic.nativeElement;

    if(this.modalidad == 1){

      const total = this.ejeY.reduce((acumulador, valor) => acumulador + valor, 0);
      const media = Math.round(total / this.ejeY.length);
      const lineaMedia =  new Array( this.ejeY.length + 1).fill(media)
      console.warn('linea media modalidad 1' ,lineaMedia);

      this.chartInstancia = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [...this.ejeX, ''],
        datasets: [
          
          {
          label: 'Cantidad aerogeneradores',
          data: [...this.ejeY, null],
          backgroundColor: '#21b5daff',
          borderWidth: 2,
          hoverBackgroundColor: '#0077b6',
          borderRadius: 5,
          barThickness: 65,
          order: 2
          },
          {
            label: 'Media',
            type: 'line',
            data: lineaMedia,
            borderColor: 'grey',
            borderWidth: 2,
            pointRadius: 2,
            borderDash: [5,5],
            order:3
          }
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
          legend: { display: true },
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
    } else if(this.modalidad == 2) {

      const total = (this.ejeYNeto.reduce((acumulador, valor) => acumulador + valor, 0)) + (this.ejeYplusY.reduce((acumulador, valor) => acumulador + valor, 0));
      console.warn('total', total);
      const media = Math.round(total / this.ejeY.length);
      console.warn('media',media);
      const lineaMedia =  new Array( this.ejeYNeto.length + 1).fill(media);
      console.warn('lineaMedia',lineaMedia);

      const tendenciaTotal = this.ejeYNeto.map((value, i) => value + this.ejeYplusY[i]);

      this.chartInstancia = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [...this.ejeX, ''],
        datasets: [
          {
          label: 'Disponibilidad y pernoctas',
          data: [...this.ejeYplusY, null],
          backgroundColor: '#116479ff',
          borderWidth: 2,
          hoverBackgroundColor: '#0077b6',
          borderRadius: 5,
          barThickness: 65,
          order: 2
          },
          {
          label: 'Aerogeneradores',
          data: [...this.ejeYNeto, null],
          backgroundColor: '#21b5daff',
          borderWidth: 2,
          hoverBackgroundColor: '#0077b6',
          borderRadius: 5,
          barThickness: 65,
          order: 2
          },
          {
          label: 'Tendencia',
          type: 'line',
          data: [...tendenciaTotal, null],
          borderColor: 'red',
          borderWidth: 2,
          pointRadius: 3,
          order:1
          },
          
          {
            label: 'Media',
            type: 'line',
            data: lineaMedia,
            borderColor: 'grey',
            borderWidth: 2,
            pointRadius: 2,
            borderDash: [5,5],
            order:3,
            yAxisID: 'yMedia'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { 
            stacked: true,
            grid: { display: false },
            ticks: {
              font: {
                size: 13,
              },
            }
            
          },
          y: {
            stacked: true,
            min: this.minValue,
            max: this.maxValue,
            ticks: {
              stepSize: this.stepSize,
              font: {
                size: 14,
              },
              callback: (value: string | number) =>  + value + this.etiqueta
            }
          },
          yMedia: {
            stacked: false,
            display: false, 
            min: this.minValue,
            max: this.maxValue
          }
        },
        plugins: {
          legend: { display: true },
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
    } else if(this.modalidad == 3) {
      this.chartInstancia = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [...this.ejeX, ''],
        datasets: [
          

          {
          label: '2025',
          type: 'line',
          data: [...this.ejeY, null],
          borderColor: 'yellow',
          borderWidth: 3,
          pointRadius: 2,
          order:1
          },
          {
          label: '2024',
          type: 'line',
          data: [ ...this.salario2024, null],
          borderColor: 'red',
          borderWidth: 3,
          pointRadius: 2,
          order:2
          },
          {
          label: '2023',
          type: 'line',
          data: [...this.salario2023, null],
          borderColor: '#76FF03',
          borderWidth: 3,
          pointRadius: 2,
          order:3
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
          legend: { display: true },
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
}
