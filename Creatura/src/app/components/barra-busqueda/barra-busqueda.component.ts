import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-busqueda',
  imports: [CommonModule, RouterLink, RegistrarUsuarioComponent, LoginComponent],
  templateUrl: './barra-busqueda.component.html',
  styleUrl: './barra-busqueda.component.scss'
})
export class BarraBusquedaComponent {
  usuarioActual: any = null;

  constructor() {
    const data = localStorage.getItem('usuarioActual');
    if (data) {
      this.usuarioActual = JSON.parse(data);
    }
  }

salir() {
  localStorage.removeItem('usuarioActual');

  const verificacion = localStorage.getItem('usuarioActual');
  if (verificacion === null) {
    console.log("✅ 'usuarioActual' eliminado con éxito del localStorage.");
    
    // Forzar recarga y redirección al mismo tiempo
    window.location.href = '/inicio'; // recarga la página y va a /inicio

  } else {
    console.error("❌ Falló la eliminación de 'usuarioActual'.");
  }
}

}


