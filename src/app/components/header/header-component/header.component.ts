import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';   
import { MatIconModule } from '@angular/material/icon'; 
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header-component',
  imports: [NavbarComponent,MatToolbarModule,MatButtonModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
