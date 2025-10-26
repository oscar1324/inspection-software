import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pilot-drone-profile',
  imports: [MatCard, MatCardHeader, CommonModule, MatCardContent],
  templateUrl: './pilot-drone-profile.html',
  styleUrl: './pilot-drone-profile.css'
})
export class PilotDroneProfile implements OnInit{

  pares1: {clave: string; valor:any } [] = [];
  pares2: {clave: string; valor: any} [] = [];

  etiquetaDER = ['Especialización','Licencia','Categoria','Aeronaves pilotadas'];
  arrayAeronaves: string[] = ['TFG-08','TFG-09','DJI 1 Mavic','DJI 2 Enterprise','DJI 3 Mini Pro'];
  dataDER: any[] = ['Revisiones industriales','A1/A3','Abierta', this.arrayAeronaves]
 
  ngOnInit(): void {
    const etiquetasIZQ = ['Nombre','Apellidos','Edad','Empresa','Provincia', 'Fecha de incorporación'];
    const dataIZQ = ['Óscar','Izquierdo Sanchón','26','Arborea Intellbird S.L','Salamanca','12/09/2022'];
    

    this.pares1 = etiquetasIZQ.map((clave,i) => ({
      clave,
      valor: dataIZQ[i]
    }));

    this.pares2 = this.etiquetaDER.map((clave,i) => ({
      clave,
      valor: this.dataDER[i]
    }))

    console.error(this.pares2);
  }
}