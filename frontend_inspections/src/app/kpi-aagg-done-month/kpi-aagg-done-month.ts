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
  @Input() months: any [] = [];
  @Input() aaggs:any[] = [];

  private chartInstancia: any;

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

    const total = this.aaggs.reduce((acumulador, valor) => acumulador + valor, 0);
    const media = Math.round(total / this.aaggs.length);
    const lineaMedia =  new Array( this.aaggs.length + 1).fill(media)

    console.log('Total -> ', total, ' - dividido entre -> ', this.aaggs.length, ' - Media -> ', media);
    
    const canvas = this.myBarGraphic.nativeElement;
    this.chartInstancia = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [...this.months, ''],
        datasets: [
          {
          data: [...this.aaggs, null],
          label: 'Inspeccionados',
          backgroundColor: '#21b5daff',
          borderWidth: 2,
          hoverBackgroundColor: '#0077b6',
          borderRadius: 5,
          barThickness: 65,
          order: 1
          },
          {
            type: 'line',
            label: 'Media',
            data: lineaMedia,
            borderColor: 'red',
            borderWidth: 2,
            pointRadius: 1,
            borderDash: [5,5],
            order:2
      
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }
          },
          y: {
            min: 0,
            max: 70,
            ticks: {
              stepSize: 10,
              callback: (value: string | number) => value + ' AAGG'
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
                  label += new Intl.NumberFormat('es-ES').format(context.parsed.y) + ' aerogeneradores';
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
