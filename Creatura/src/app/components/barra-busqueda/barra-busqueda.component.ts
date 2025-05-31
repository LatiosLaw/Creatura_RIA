import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-barra-busqueda',
  imports: [RouterLink, RegistrarUsuarioComponent, LoginComponent],
  templateUrl: './barra-busqueda.component.html',
  styleUrl: './barra-busqueda.component.scss'
})
export class BarraBusquedaComponent {

}
