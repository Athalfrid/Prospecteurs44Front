import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header-component/header.component';
import { BottomComponent } from './components/bottom/bottom-component/bottom.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,BottomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Prospecteurs44Front';
}
