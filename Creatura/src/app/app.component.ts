import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BarraBusquedaComponent } from "./components/barra-busqueda/barra-busqueda.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,BarraBusquedaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Creatura';
}

