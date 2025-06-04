import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-component',
  imports: [],
  templateUrl: './bottom.component.html',
  styleUrl: './bottom.component.css'
})
export class BottomComponent {
  currentYear : number = new Date().getFullYear();

}
