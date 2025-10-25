
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { InspectionsService } from '../../services/InspectionsService';
import { Inspection } from '../../models/inspection.model';
import { WindFarm } from '../../models/windfarm.model';
import { TotalCountWTGPiloted } from '../../models/total-wtg-pilotados.model';
import { MatCard } from "@angular/material/card";
import { MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import { MatCardContent } from "@angular/material/card";
import { KpiPorcentajeCard } from '../../kpi-porcentaje-card/kpi-porcentaje-card';
import { TableCard } from '../../table-card/table-card';
import { KpiExtraMonth } from '../../kpi-extra-month/kpi-extra-month';

@Component({
  selector: 'app-technical-data-windfarm',
  imports: [
    MatCard,
    MatCardHeader,
    MatButtonModule,
    TableCard,
    KpiPorcentajeCard,
    KpiExtraMonth
],
  templateUrl: './technical-data-windfarm.html',
  styleUrl: './technical-data-windfarm.css'
})
export class TechnicalDataWindfarm implements OnInit {


  name: string = '';
  location: string = '';
  province: string = '';
  country: string = '';
  client: string = '';
  total_aagg: number = 0;
  type_blade: string = '';

  fecha_inicial: string = 'No comenzado';
  fecha_final: string = 'No finalizado';

  datosRecibidos: any;
  idObtenidoNavegacion: number = 0;
  almacenInspectionById: Inspection[] = [];
  stateDataLoad: boolean = false;

  cantidadExtraGeneradaEnParque: number = 0;
  cantidadTotalGeneradaEnParque: number = 0;
  cantidadDiasRequeridosEnParque: number = 0;
  cantidadAerogeneradoresinspeccionadosEnParque: number = 0;
  
  private windFarmName!: string;
  imagePath: string = 'assets/images/not-photo.png';


  claveValorImagenes: Record<string ,string> = {
    'PE Candeeiros' : 'pe-candeeiros.jpg',
    'PE São Cristóvão ' : 'pe-são-cristóvão.jpg',
    'PE Pampilhosa' : 'pe-pampilhosa.jpg',
    'PE Munera I' : 'pe-muneraI.jpg',
    'PV Fotovoltaico' : 'pv-fotovoltaico.jpg',
    'PE Alvão' : 'pe-alvão.jpg',
    'PE Bon Vent de Vilalba' : 'pe-bon-vent-de-vilalba.jpg',
    'PE Alto do Monçao' : 'pe-alto-monçao.jpg',
    'PE Catefica' : 'pe-catefica.jpg',
    'PE Campanario' : 'pe-campanario.jpg',
    'PE Korytnica II' : 'pe-korytnica-II.jpg',
    'PE Zopowy' : 'pe-zopowy.jpg',
    'PE Chambonchard' : 'pe-chambonchard.jpg',
    'PE Boussac' : 'pe-boussac.JPG',
    'PE Croix' : 'pe-croix.jpg',
    'PE Viñas' : 'pe-viñas.JPG',
    '' : '',
    '' : '',
  }

  constructor(
    private router: Router,
    private inspection: InspectionsService,
    private changeDetector: ChangeDetectorRef
  ){
    // Accedemos al objeto state del historial de navegación
    const navigation = this.router.getCurrentNavigation();
    this.datosRecibidos = navigation?.extras.state?.['data'];
  }

  ngOnInit(): void {
    console.log("Datos recibidos por navegación -> ", this.datosRecibidos);
    
    this.asignarDatosNavegacion();
    this.getDataInspection();
    
  }

  getWindFarmImage():string {
    const imagen = this.claveValorImagenes[this.name] || 'not-photo.png';
    const path = `assets/images/${imagen}`;
    return path;
  }



  getDataInspection(): void {
    console.log('ID A ENVIAR -> ', this.idObtenidoNavegacion);
    this.inspection.getInspectionById(this.idObtenidoNavegacion).subscribe({
      next: (data: Inspection[]) => {
        this.almacenInspectionById = data;

        this.almacenInspectionById.sort((a,b) => {

          const fecha1 = new Date(a.date);
          const fecha2 = new Date(b.date);

          return fecha1.getTime() - fecha2.getTime();
        })

        this.almacenarIngresosVariable(this.almacenInspectionById);

        this.stateDataLoad = true;
        this.changeDetector.detectChanges();
        console.log('DATOS RECIBIDOS DEL BACKEND -> ', this.almacenInspectionById);
        // Tiene que venir un array de arrays con 4 objetos
      },
      error: (err) => {
        console.error('Se ha producido un error en la obtención de inspection por id -> ' , err);
      }
    })
  }



  asignarDatosNavegacion(): void {
    this.name = this.datosRecibidos.name;
    this.location = this.datosRecibidos.location;
    this.province = this.datosRecibidos.province;
    this.country = this.datosRecibidos.country;
    this.client = this.datosRecibidos.client;
    this.type_blade = this.datosRecibidos.type_blade;
    this.total_aagg = this.datosRecibidos.total_aagg
    this.idObtenidoNavegacion = this.datosRecibidos.id;
    this.getWindFarmImage();
  }

  almacenarIngresosVariable(array: Inspection[]): void {
    const contador = 0;
    
    // Recorre bucle para almacenar todos los ingresos extra y añadirle los ingresos generados por días de inspección trabajados
    for(const inspeccionRegistrada of array){

      this.cantidadDiasRequeridosEnParque++;
      this.cantidadExtraGeneradaEnParque = this.cantidadExtraGeneradaEnParque  + inspeccionRegistrada.net_total_income;
      this.cantidadTotalGeneradaEnParque = this.cantidadTotalGeneradaEnParque + inspeccionRegistrada.net_total_income + 65;
      this.cantidadAerogeneradoresinspeccionadosEnParque = this.cantidadAerogeneradoresinspeccionadosEnParque + inspeccionRegistrada.number_wind_turbines_generators;
     
    }
  }

}
