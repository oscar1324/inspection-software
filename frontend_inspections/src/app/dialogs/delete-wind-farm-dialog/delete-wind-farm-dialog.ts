import { Component, Inject, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WindFarm } from '../../models/windfarm.model';
import { WindFarmService } from '../../services/WindFarmService';


@Component({
  selector: 'app-delete-wind-farm-dialog',
  imports: [

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './delete-wind-farm-dialog.html',
  styleUrl: './delete-wind-farm-dialog.css'
})
export class DeleteWindFarmDialog {

  id: number = -1;
  name: string = "";

  formData = {};

  constructor(
    public dialogRef: MatDialogRef<DeleteWindFarmDialog>, // Controlar el comportamiento del Dialog
    @Inject(MAT_DIALOG_DATA) public data: {id:number ,nameWindFarm: string}, // Para que el componente pueda recibir datos del componente que lo abrio
    private windFarmService: WindFarmService,
    private _snackbar: MatSnackBar
  ){
    this.id = data.id;
    this.name = data.nameWindFarm;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  DeleteWindFarmID(): void {
    console.log("Enviar peticion");
    this.formData = {
      'id': this.id,

    }

    this.windFarmService.deleteWindFarmID(this.formData).subscribe({
      next: (response) => {
        console.log('Se ha borrado exitosamente el parque eolico con ID', this.id);
        this.dialogRef.close();
        
        this._snackbar.open('Parque eólico eliminado con exito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this.refrescar();
      },
      error: (error) => {
        console.error('No se ha podido borrar parque eólico ->' , error);
        this._snackbar.open('Parque eólico eliminado con exito', 'Cerrar', {
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
    }, 3000);
    
  }

 

}
