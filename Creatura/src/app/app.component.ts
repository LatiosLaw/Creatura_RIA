import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraBusquedaComponent } from "./components/barra-busqueda/barra-busqueda.component";
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,BarraBusquedaComponent, BarraNavegacionComponent, InicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  usuarioActual:any;
  title = 'Creatura';
 
   constructor() {
      const usuarioData = localStorage.getItem('usuarioActual');
      if (usuarioData) {
        this.usuarioActual = JSON.parse(usuarioData);
      }
      console.log(localStorage.getItem('usuarioActual'));
    }



}

