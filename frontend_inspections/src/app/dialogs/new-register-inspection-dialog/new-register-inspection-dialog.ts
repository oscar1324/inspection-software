import { Component} from '@angular/core';
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

    constructor(
      public dialogRef: MatDialogRef<NewRegisterInspectionDialog>,
    ) {
  
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
    {valor: '25', nombre : 'Sí'},
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
  comment: string = "";
  wind_farm_id!: number;
  photovoltaic_plant_id: number = 3;


  sendNewRegister(): void {
    let generado_por_aagg = (this.number_wind_turbines_generators - 3) * 25 ;
    let generado_gross = generado_por_aagg + this.over_night;
    console.log('----------------------------------');
    console.log('type_inspection: ', this.type_inspection);
    console.log('date: ', this.date);
    console.log('over_night: ', this.over_night);
    console.log('number_wind_turbines_generators: ', this.number_wind_turbines_generators);
    console.log('wind_turbine_generator_accounted: ', this.number_wind_turbines_generators - 3 );
    console.log('piloted_by_me: ', this.piloted_by_me );
    console.log('payment_wind_turbine_generators: ',generado_por_aagg , ' €');
    console.log('gross_total_income: ', generado_gross , '€');
    console.log('net_total_income: ', generado_gross * 0.8 , '€');
    console.log('wind_farm_id: ', );
    console.log('photovoltaic_plant_id: ', );

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
