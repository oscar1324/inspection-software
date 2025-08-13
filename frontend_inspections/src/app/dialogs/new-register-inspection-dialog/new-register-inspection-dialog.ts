import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


// Módulos de Angular Material
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-register-inspection-dialog',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './new-register-inspection-dialog.html',
  styleUrl: './new-register-inspection-dialog.css'
})
export class NewRegisterInspectionDialog {

}
