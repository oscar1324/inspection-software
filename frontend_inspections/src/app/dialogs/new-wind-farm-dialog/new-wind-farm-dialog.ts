import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- ¡Necesario para [(ngModel)]!
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { WindFarmService } from '../../services/WindFarmService';
import { MatSnackBar } from '@angular/material/snack-bar';


// Módulos de Angular Material
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-wind-farm-dialog',
  imports: [
    CommonModule,
    FormsModule,          // Para el two-way data binding del formulario
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule

  ],
  templateUrl: './new-wind-farm-dialog.html',
  styleUrl: './new-wind-farm-dialog.css'
})
export class NewWindFarmDialog {

  mostrar: boolean = false; 
  opcionesCountry = [
    {valor: 'España', nombre: 'España'},
    {valor: 'Portugal', nombre: 'Portugal'},
    {valor: 'Polonia', nombre: 'Polonia'},
    {valor: 'Reino Unido', nombre: 'Reino Unido'},
    {valor: 'Francia', nombre: 'Francia'}
  ]

  opcionesClient = [
    {valor: 'Iberdrola', nombre: 'Iberdrola'},
    {valor: 'Nadara', nombre: 'Nadara'}
  ]

  // Propiedades del formulario
  name: string = "";
  location: string = "";
  province: string = "";
  country: string = "";
  client: string= "";
  total_aagg: number = 0;
  type_blade: string = "";

    formData = {
 
    }

  constructor(
    public dialogRef: MatDialogRef<NewWindFarmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private windFarmService: WindFarmService,
    private _snackBar: MatSnackBar
  ) {

  }

  // This function close the Dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

  mostrarSnackBar(mensaje: string, duracion: number = 2000): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: duracion,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  sendHttp(): void {
    this.formData = {
      'name' : this.name,
      'location' : this.location,
      'province' : this.province,
      'country' : this.country,
      'client' : this.client,
      'total_aagg' : this.total_aagg,
      'type_blade' : this.type_blade,
    }

    this.windFarmService.createNewWindFarm(this.formData).subscribe({
      next: (response) => {
        console.log('PARQUE EÓLICO CREADO CON ÉXITO:', response);
        this.dialogRef.close(true);
        
        this._snackBar.open('Parque eólico creado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.refrescar();
        
      },
      error: (error) => {
        console.log('Hubo un error: ', error);
        this._snackBar.open('Error al crear el parque eólico', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.dialogRef.close(false);
      }
    })
    ;
  }

  refrescar(): void {

    setTimeout(() => {
      window.location.reload();
    }, 3000);
    
  }
}
