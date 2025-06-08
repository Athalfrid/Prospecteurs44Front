import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlerteSosService } from '../../../services/alerte-sos/alerte-sos.service';

import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alertesos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alertesos.component.html',
  styleUrls: ['./alertesos.component.css'],
})
export class AlertesosComponent {
  alerteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alerteSosService: AlerteSosService,
    private matDialog: MatDialog
  ) {
    this.alerteForm = this.fb.group({
      titreAlerte: ['', Validators.required],
      dateAlerte: [new Date(), Validators.required],
      descriptionAlerte: ['', Validators.required],
      dateObjetPerdu: ['', Validators.required],
      lieuObjetPerdu: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.alerteForm.valid) {
      const formData = this.alerteForm.value;
      console.log('Alerte envoyée :', formData);

      this.alerteSosService.createAlerte(formData).subscribe({
        next: () => {
          this.matDialog.open(SuccessDialogComponent, {
            data: { message: 'Alerte envoyée avec succès !' },
          });
          this.alerteForm.reset();
        },
        error: (err) => {
          this.matDialog.open(SuccessDialogComponent, {
            data: { message: 'Erreur 😱 : ' + err.message },
          });
        },
      });
    } else {
      this.alerteForm.markAllAsTouched();
    }
  }
}
