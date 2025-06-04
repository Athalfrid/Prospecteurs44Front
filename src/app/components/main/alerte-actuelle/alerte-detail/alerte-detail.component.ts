import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { AlerteSosDTO } from '../../../../dto/alerte-sos.dto';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AlerteSosService } from '../../../../services/alerte-sos.service';
import { SuccessDialogComponent } from '../../../shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-alerte-detail',
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './alerte-detail.component.html',
  styleUrl: './alerte-detail.component.css',
})
export class AlerteDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public alerte: AlerteSosDTO,
    private alerteSosService: AlerteSosService,
    private matDialog: MatDialog
  ) {}

  participateToAlert() {
    this.alerteSosService.participateToAlert(this.alerte.idAlerte).subscribe({
      next: (response) => {
        this.matDialog.open(SuccessDialogComponent, {
          data: {
            message: response.message,
          },
        });
      },
      error: (err) => {
        this.matDialog.open(SuccessDialogComponent, {
          data: { message: 'Erreur 😱 : ' + err.message },
        });
      },
    });
  }
}
