import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraBusquedaComponent } from "./components/barra-busqueda/barra-busqueda.component";
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarraBusquedaComponent, BarraNavegacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Creatura';
}

