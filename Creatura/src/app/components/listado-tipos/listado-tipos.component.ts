import { Component, OnInit } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-tipos',
  imports: [RouterOutlet,RouterLink,CommonModule, NgOptimizedImage],
  templateUrl: './listado-tipos.component.html',
  styleUrl: './listado-tipos.component.scss'
})
export class ListadoTiposComponent {
	tipos: any[] = [];
	constructor(private connector: ConeccionService){}
	
	ngOnInit(): void {
		this.connector.get_Todos_Los_Tipos().subscribe(res => {
			this.tipos = res;
			console.log(this.tipos);
		});
	}
	Recargar_Listado_de_Tipos(): void {
		this.connector.get_Todos_Los_Tipos().subscribe(res => {
			this.tipos = res;
			console.log(this.tipos);
		});
	}
}
