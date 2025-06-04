import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  currentView: string = 'profil';

  profilData: any;
  alertesData: any;

  selectView(view: string) {
    this.currentView = view;

    if (view === 'profil' && !this.profilData) {
      this.loadProfilData();
    }
    else if (view === 'alertes' && !this.alertesData) {
      this.loadAlertesData();
    }
  }

  loadProfilData(){

  }

  loadAlertesData(){

  }


}
