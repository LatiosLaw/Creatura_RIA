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

	url_iconos = 'http://localhost:41062/www/imagenes/tipos/';
	
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
	Mostrar_Tipo(id: any){
		const x_cero: any[] =[];
		const x_medio: any[] = [];
		const x_uno: any[] = [];
		const x_dos: any[] = [];

		console.log("Mostando el tipo: " + id);
		this.connector.Mostar_Tipo(id).subscribe(res => {
			const defensas  = res.defensas;
		defensas.foreach( (el_otro_tipo:any[]) => {
		
				switch(el_otro_tipo.multiplicador){
					case 0:{
						x_cero.push(el_otro_tipo);
						break;
					}
					case 0.5:{
						x_medio.push(el_otro_tipo);
						break;
					}
					case 1:{
						x_uno.push(el_otro_tipo);
						break;
					}
					case 2:{
						x_dos.push(el_otro_tipo);
						break
					}
					default:{
						x_uno.push(el_otro_tipo);
					}
				}
		});
			

		});
	}

	Exportar_Tipo(id : any){
		console.log("Exportando el tipo: " + id);
	}

	Eliminar_Tipo(id:any){
		console.log("Eliminado el tipo: "+id);
	}
}
