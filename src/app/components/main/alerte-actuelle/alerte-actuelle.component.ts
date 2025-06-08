import { AfterViewInit, Component, OnInit,  ViewChild } from '@angular/core';
import { AlerteSosService } from '../../../services/alerte-sos/alerte-sos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AlerteSosDTO } from '../../../dto/alerte-sos.dto';
import { MatDialog,  } from '@angular/material/dialog';
import { AlerteDetailComponent } from './alerte-detail/alerte-detail.component';

@Component({
  selector: 'app-alerte-actuelle',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './alerte-actuelle.component.html',
  styleUrl: './alerte-actuelle.component.css',
})
export class AlerteActuelleComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'titreAlerte',
    'dateAlerte',
    'lieuObjetPerdu',
    'action',
  ];

  dataSource = new MatTableDataSource<AlerteSosDTO>();
  loading = false;

  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private alerteSoSService: AlerteSosService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts() {
    this.loading = true;
    this.error = null;

    this.alerteSoSService.getAllAlerts().subscribe({
      next: (alerts) => {
        console.log('Alertes reçues :',alerts);
        this.dataSource.data = alerts;
        this.loading = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Erreur lors du chargement des alertes.';
        console.error(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetails(element:AlerteSosDTO){
    this.dialog.open(AlerteDetailComponent,{
      data: element
    })
  }
}
