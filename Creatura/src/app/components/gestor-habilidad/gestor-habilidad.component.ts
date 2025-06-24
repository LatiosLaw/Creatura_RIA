import { Component,OnInit  } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { ListadoHabilidadComponent } from '../listado-habilidad/listado-habilidad.component';
import { BarraGestorHabilidadComponent } from '../barra-gestor-habilidad/barra-gestor-habilidad.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestor-habilidad',
  imports: [RouterOutlet,RouterLink,ListadoHabilidadComponent,BarraGestorHabilidadComponent,CommonModule, NgOptimizedImage],
  templateUrl: './gestor-habilidad.component.html',
  styleUrl: './gestor-habilidad.component.scss'
})
export class GestorHabilidadComponent {

}
