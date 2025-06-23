import { Component, OnInit } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet , Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { TipoComparado } from '../../interfaces/tipo-comparado';
import { ResultadoPeticionDefensas } from '../../interfaces/resultado-peticion-defensas';
import { Tipo } from '../../interfaces/tipo';

@Component({
  selector: 'app-modificar-tipo',
  imports: [],
  templateUrl: './modificar-tipo.component.html',
  styleUrl: './modificar-tipo.component.scss'
})
export class ModificarTipoComponent {

	constructor(private connector: ConeccionService, private fb: FormBuilder,private route: ActivatedRoute, private router:Router){}

	el_tipo : Tipo | undefined;

	url_iconos = 'http://localhost:41062/www/imagenes/tipos/';

	buffer_de_todos_los_tipos: Tipo[] | undefined;

	ngOnInit(): void{
	
		 this.connector.get_Todos_Los_Tipos().subscribe(res => {
		 	this.buffer_de_todos_los_tipos=res;
		 	this.Arreglar_url_imagenes();
		 });
		 if (this.buffer_de_todos_los_tipos==undefined){
		 	this.router.navigate(["/listarTipos"]);
		 }
		this.route.queryParams.subscribe(params => {
			if(this.buffer_de_todos_los_tipos != undefined){
			for (let un_tipo of this.buffer_de_todos_los_tipos){
				if (un_tipo.id_tipo === params['id_tipo']){
					this.el_tipo= un_tipo;
				}
			}
			}
		});
		 if (this.el_tipo==undefined){
		 	this.router.navigate(["/listarTipos"]);
		 }else {

		console.log("Modificando el tipo: "+this.el_tipo.id_tipo);
		 }
	}

	//La siguiente funcion es solo para mi [Manuel]; es para que funcione con mi configuración local.
	Arreglar_url_imagenes():void{
		if (this.buffer_de_todos_los_tipos == undefined){
			return;
		}
		let buffer_temporal_de_todos_los_tipos : Tipo[] =[];
		for (let un_tipo of this.buffer_de_todos_los_tipos){
			if (un_tipo == undefined){
				return;
			}
			if (un_tipo.icono == undefined){
				return;
			}
			un_tipo.icono = this.url_iconos + un_tipo.icono;
			buffer_temporal_de_todos_los_tipos.push(un_tipo);
		}
		this.buffer_de_todos_los_tipos = buffer_temporal_de_todos_los_tipos;
	
	}
	Cargar_Todos_Los_Tipos():void{
	
		}

}
