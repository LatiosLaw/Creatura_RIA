import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  imports: [],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.scss'
})
export class PerfilUsuarioComponent {
  usuarioActual: any = null;

  constructor() {
    const data = localStorage.getItem('usuarioActual');
    if (data) {
      this.usuarioActual = JSON.parse(data);
    }
  }
}
