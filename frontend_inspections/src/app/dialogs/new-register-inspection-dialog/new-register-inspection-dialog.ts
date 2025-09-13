import { Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms'; // <-- ¡Necesario para [(ngModel)]!
import { MatSelectModule } from '@angular/material/select';

// Módulos de Angular Material
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption } from '@angular/material/autocomplete';
import { Inspection } from '../../models/inspection.model';
import { InspectionsService } from '../../services/InspectionsService';




@Component({
  selector: 'app-new-register-inspection-dialog',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule
],
  templateUrl: './new-register-inspection-dialog.html',
  styleUrl: './new-register-inspection-dialog.css'
})
export class NewRegisterInspectionDialog {

  id_obtenido: number = 0;
  country_obtenido: string = "";


  constructor(
    public dialogRef: MatDialogRef<NewRegisterInspectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id:number, country:string, dataArray: any[]}, // Para que peuda recibir datos del componente que lo abrio
    private inspectionService: InspectionsService,
    private _snackbar: MatSnackBar
  ) {
    this.id_obtenido = data.id;
    this.country_obtenido = data.country;
    console.error("ID QUE LEGA: " , this.id_obtenido);

  }

  opciones_type_inspection = [
    {valor: 'Inspección eólica', nombre: 'Inspección eólica'},
    {valor: 'Inspección fotovoltaica', nombre: 'Inspección fotovoltaica'}
  ];

  opciones_team_mate = [
    { valor:'Alejandro', nombre: 'Alejandro'},
    { valor:'Rubén', nombre: 'Rubén'},
    { valor:'Adrían', nombre: 'Adrían'},
  ]

  opciones_pernocta = [
    {valor: '40', nombre : 'Sí'},
    {valor: '0', nombre: 'No'}
  ]

  type_inspection: string = "";
  date!: Date;
  availability: number = 0;
  over_night: number = 0;
  number_wind_turbines_generators: number = 0;
  wind_turbine_generator_accounted: number = 0;
  piloted_by_me: number = 0;
  team_mate: string = "";
  payment_wind_turbine_generators: number = 0;
  gross_total_income: number = 0;
  net_total_income: number = 0;
  comment_value: string = "";
  wind_farm_id!: number;
  photovoltaic_plant_id: number = 3;


  sendNewRegister(): void {
    let generado_por_aagg = (this.number_wind_turbines_generators - 3) * 25 ;
    let generado_gross = generado_por_aagg + this.over_night;



    //1- REALIZAR CALCULOS
    if(this.comment_value === 'Viaje ida'){
      this.availability = 40;
      console.log('Disponibilidad ' , this.availability , '€')
    } else if (this.comment_value == "Viaje ida internacional") {
      this.availability = 70;
      console.log('Disponibilidad ' , this.availability , '€')
    }

    let fecha = this.obtener_fecha(this.date);
    const formattedDate = this.date.toISOString().split('T')[0];
    let total_aagg_accounted = this.calcular_wind_turbine_generator_accounted(this.number_wind_turbines_generators);
    let total_precio_bruto_aagg_contabilizados = this.calcular_precio_bruto_aagg(total_aagg_accounted);
    let total_gross = this.calcular_gross_total_income(this.availability, this.over_night, total_precio_bruto_aagg_contabilizados);
    let total_net = this.calcular_net_total_income(total_gross);

    const formatoFecha = this.date.toISOString().split('T')[0];

    //2- CREAR OBJETO JSON
    const objeto_json_new_inspection: Inspection = {
      id: 0,
      type_inspection: 'Inspección eólica',
      date: this.obtener_fecha(this.date),
      availability: this.availability,
      over_night: this.over_night,
      number_wind_turbines_generators: this.number_wind_turbines_generators,
      wind_turbine_generator_accounted: total_aagg_accounted,
      piloted_by_me : this.piloted_by_me,
      team_mate: this.team_mate,
      payment_wind_turbine_generators: total_precio_bruto_aagg_contabilizados, 
      gross_total_income: total_gross,  
      net_total_income: total_net,  
      comment: this.comment_value,
      wind_farm_id: this.id_obtenido, 
      photovoltaic_plant_id: 2 
    }

    console.log(objeto_json_new_inspection);

    //3- ENVIAR HTTP
    this.inspectionService.insertNewDialyRegister(objeto_json_new_inspection).subscribe({
      next: (response) => {
        this.dialogRef.close();
        this._snackbar.open('¡Inspección registrada con exito!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.refrescar();
      },
      error: (error) => {
        console.error('Error en intento de registrar inspección: ' , error)
        this._snackbar.open('¡No se ha podido registrar la isnpección!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    })


  }

    refrescar(): void {

    setTimeout(() => {
      window.location.reload();
    }, 2000);
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  obtener_fecha(date: Date): string {
    const dia = date.getDate().toString().padStart(2,'0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const fecha =  `${year}-${mes}-${dia}`;


    return  fecha;
  }

  // Realiza el calculo de los aerogeneradores que se pagan
  calcular_wind_turbine_generator_accounted(num_total_inspeccionados: number): number {
    let aagg_contabilizados: number = 0;

    if(num_total_inspeccionados > 3) {
      aagg_contabilizados = num_total_inspeccionados - 3;
    }

    return aagg_contabilizados;
  }

  calcular_precio_bruto_aagg(aagg_contabilizados: number): number {
    
    let precio_bruto_contabilizados = aagg_contabilizados * 25;

    return precio_bruto_contabilizados;
  }

  calcular_gross_total_income(disponibilidad: number, noche: number, bruto_aagg: number): number {

    let total: number = Number(disponibilidad) + Number(noche) + Number(bruto_aagg);

    return total;
  }

  calcular_net_total_income(total_gross: number): number {
    let total_net = total_gross * 0.80;

    return total_net;
  }

}
