import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-kpi-aagg-done-month',
  imports: [CommonModule, MatCardModule],
  templateUrl: './kpi-aagg-done-month.html',
  styleUrl: './kpi-aagg-done-month.css'
})
export class KpiAaggDoneMonth implements OnInit, AfterViewInit {
  @ViewChild('myBarGraphic') myBarGraphic!: ElementRef<HTMLCanvasElement>;
  private chartInstancia: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createBarGraphic();
  }

  createBarGraphic(): void {
    const canvas = this.myBarGraphic.nativeElement;
    this.chartInstancia = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['03-03-2010','04-03-2010','04-03-2010', '03-05-2010','04-08-2010','04-10-2010'],
        datasets: [{
          data: [15,2,9,13,20,34],
          label: 'Ejemplo',
          backgroundColor: '#21b5da',
          borderWidth: 1,
          hoverBackgroundColor: '#3777c0',
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false } },
          y: {
            min: 0,
            max: 60,
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
          }
        }
      }
    });
  }
}
