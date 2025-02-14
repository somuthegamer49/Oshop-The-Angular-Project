import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { BsNavbarComponent } from "./bs-navbar/bs-navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet,BsNavbarComponent],
  
templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() { }
  title = 'oshop';
}
