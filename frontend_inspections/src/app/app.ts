import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';


import { InspectionsService } from './services/InspectionsService';
import { Inspection } from './models/inspection.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterOutlet,CommonModule, CurrencyPipe, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Dashboard de Inspecciones Eólicas campaña 2025';
  inspections: Inspection[] = [];
  loading:boolean = false;
  error: string | null = null;

  constructor(private inspectionService: InspectionsService){}

  loadInspection(): void {
    this.loading = true;
    this.error= null;

    this.inspectionService.getAllInspections().subscribe({
      next: (data: Inspection[]) => {
        this.inspections = data;
        this.loading = false;
        console.log('Datos de inspecciones recibidos: ', this.inspections);
      },
      error: (err) => {
        this.error = 'Error al cargar las inspecciones: ' + (err.mess || err.statusText)
        this.loading = false;
        console.error('Se ha producido un error: ' , err);
      },
      complete: () => {
        console.log('Petición de inspecciones completada.');
      }
    })


  }
}
