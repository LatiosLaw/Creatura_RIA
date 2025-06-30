import { Component, OnInit } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { TipoComparado } from '../../interfaces/tipo-comparado';
import { ResultadoPeticionDefensas } from '../../interfaces/resultado-peticion-defensas';
import { Tipo } from '../../interfaces/tipo';

@Component({
  selector: 'app-listado-tipos',
  imports: [RouterOutlet,RouterLink,CommonModule, NgOptimizedImage],
  templateUrl: './listado-tipos.component.html',
  styleUrl: './listado-tipos.component.scss'
})
export class ListadoTiposComponent {
	tipos: Tipo[] = [];
	
	mostar_tipos_html:any;

	usuario_actual:any;


	constructor(private connector: ConeccionService, private fb: FormBuilder,private route: ActivatedRoute){
		const usuarioData = localStorage.getItem('usuarioActual');
		if (usuarioData) {
			this.usuario_actual = JSON.parse(usuarioData);
		} 

		
	}
	
	ngOnInit(): void {
		/*
		this.connector.get_Todos_Los_Tipos().subscribe(res => {
			this.tipos = res;
			this.Arreglar_url_imagenes();
		});
	       */
	      this.connector.get_Tipos_Creados_Por(this.usuario_actual.nickname).subscribe((res:any) =>{
	      	this.tipos = res;
	      
	      });
		//this.mostar_tipos_html = require('html-loader!./mostrar-tipos.html');
		//this.mostar_tipos_html = this.mostar_tipos_html.default;

	}
	Recargar_Listado_de_Tipos(): void {
		this.connector.get_Todos_Los_Tipos().subscribe(res => {
			this.tipos = res;
			console.log(this.tipos);
		});
	}
	Mostrar_Tipo(id: any){
		const x_cero: TipoComparado[] =[];
		const x_medio: TipoComparado[] = [];
		const x_uno: TipoComparado[] = [];
		const x_dos: TipoComparado[] = [];


		let el_tipo : Tipo | undefined;


		for (let un_tipo of this.tipos){
			if(un_tipo.id_tipo==id){
				el_tipo=un_tipo;
				break;
			} 
		}
		if (el_tipo === undefined){
			return;
		}


		console.log("Mostando el tipo: " + id);
		this.connector.Mostar_Tipo(id).subscribe( (res:any) => {
			const la_respuesta:ResultadoPeticionDefensas = res;
			const defensas : any[]  = res.defensas;
		defensas.forEach( (el_otro_tipo:TipoComparado) => {
		
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
		/*
			console.log("Resistencia Cero: \n"+x_cero);	
			console.log("Resistencia medio: \n"+x_medio);	
			console.log("Resistencia uno: \n"+x_uno);	
			console.log("Resistencia dos: \n"+x_dos);
		       */

			let div_niveles_styles : string ="";
			let etiqueta_styles:string="";
			let contenido_tipo_styles: string = "";
			let nombre_del_tipo_styles: string = "";
			let imagen_del_tipo_styles: string = "";
			let icon_del_tipo_styles: string = "width: 20px; height: 20px;";

			let un_tipo_background_color: string = "";

			let div_niveles_class : string = "nivel-de-la-resistencia-mostrar-tipo";
			let etiqueta_class:string="";
			let contenido_tipo_class: string = "contenido-mostrar-tipo m2";
			let nombre_del_tipo_class: string = "nombre-del-tipo-mostrar-tipo text-center";
			let imagen_del_tipo_class: string = "imagen-del-tipo-mostrar-tipo text-center";
			let icon_del_tipo_class: string = "icono-del-tipo-mostrar-tipo";

		let mostrar_tipo_html = `<div class="d-flex flex-wrap justify-content-around">
		`;

		mostrar_tipo_html+=`<div class="${div_niveles_class}" style="${div_niveles_styles}">
		<p styles=${etiqueta_styles}>X 0</p>
		`;
			for (let un_tipo of x_cero ){
				un_tipo_background_color = "background-color: #"+un_tipo.color+";";
				mostrar_tipo_html+=`<div class="${contenido_tipo_class}" style="${contenido_tipo_styles+un_tipo_background_color}">
				<a>
				
				<div class="imagen-del-tipo-mostar-tipo text-center" style="${imagen_del_tipo_styles}">
				<img src="${un_tipo.icono}" class="icon-del-tipo-mostrar-tipo" alt="${un_tipo.nombre_tipo}" style="${icon_del_tipo_styles}">
				</div>
				<div class="nombre-del-tipo-mostar-tipo text-center" style="${nombre_del_tipo_styles}">
				${un_tipo.nombre_tipo}
				</div>

				</a>
				</div>
				`;
			
			}
			mostrar_tipo_html+=`</div>`
		mostrar_tipo_html+=`<div class="${div_niveles_class}" style="${div_niveles_styles}">
		<p styles=${etiqueta_styles}>X 0.5</p>
		`;
			for (let un_tipo of x_medio ){
				un_tipo_background_color = "background-color: #"+un_tipo.color+";";
				mostrar_tipo_html+=`<div class="${contenido_tipo_class}" style="${contenido_tipo_styles+un_tipo_background_color}">
				<a>
				
				<div class="imagen-del-tipo-mostar-tipo text-center" style="${imagen_del_tipo_styles}">
				<img src="${un_tipo.icono}" class="icon-del-tipo-mostrar-tipo" alt="${un_tipo.nombre_tipo}" style="${icon_del_tipo_styles}">
				</div>
				<div class="nombre-del-tipo-mostar-tipo text-center" style="${nombre_del_tipo_styles}">
				${un_tipo.nombre_tipo}
				</div>

				</a>
				</div>
				`;
			
			}
			mostrar_tipo_html+=`</div>`
		mostrar_tipo_html+=`<div class="${div_niveles_class}" style="${div_niveles_styles}">
		<p styles=${etiqueta_styles}>X 1</p>
		`;
			for (let un_tipo of x_uno ){
				un_tipo_background_color = "background-color: #"+un_tipo.color+";";
				mostrar_tipo_html+=`<div class="${contenido_tipo_class}" style="${contenido_tipo_styles+un_tipo_background_color}">
				<a>
				
				<div class="imagen-del-tipo-mostar-tipo text-center" style="${imagen_del_tipo_styles}">
				<img src="${un_tipo.icono}" class="icon-del-tipo-mostrar-tipo" alt="${un_tipo.nombre_tipo}" style="${icon_del_tipo_styles}">
				</div>
				<div class="nombre-del-tipo-mostar-tipo text-center" style="${nombre_del_tipo_styles}">
				${un_tipo.nombre_tipo}
				</div>

				</a>
				</div>
				`;
			
			}
			mostrar_tipo_html+=`</div>`
		mostrar_tipo_html+=`<div class="${div_niveles_class}" style="${div_niveles_styles}">
		<p styles=${etiqueta_styles}>X 2</p>
		`;
			for (let un_tipo of x_dos ){
				un_tipo_background_color = "background-color: #"+un_tipo.color+";";
				mostrar_tipo_html+=`<div class="${contenido_tipo_class}" style="${contenido_tipo_styles+un_tipo_background_color}">
				<a>
				
				<div class="imagen-del-tipo-mostar-tipo text-center" style="${imagen_del_tipo_styles}">
				<img src="${un_tipo.icono}" class="icon-del-tipo-mostrar-tipo" alt="${un_tipo.nombre_tipo}" style="${icon_del_tipo_styles}">
				</div>
				<div class="nombre-del-tipo-mostar-tipo text-center" style="${nombre_del_tipo_styles}">
				${un_tipo.nombre_tipo}
				</div>

				</a>
				</div>
				`;
			
			}
			mostrar_tipo_html+=`</div>`
		Swal.fire({
		title: el_tipo.nombre_tipo,
		html: mostrar_tipo_html,		
	        confirmButtonColor: '#3085d6'
		});	

		});
	}

	Exportar_Tipo(id : any){
		console.log("Exportando el tipo: " + id);
	}

	Eliminar_Tipo(id:any){
		console.log("Eliminado el tipo: "+id);
		let el_tipo : Tipo | undefined;



		for (let un_tipo of this.tipos){
			if(un_tipo.id_tipo==id){
				el_tipo=un_tipo;
				break;
			} 
		}
		if (el_tipo === undefined){
			return;
		}
		Swal.fire({
			title: "Eliminar tipo " + el_tipo.nombre_tipo,
			text: "¿Desea eliminar el tipo: "+el_tipo.nombre_tipo+" ?",
		        confirmButtonColor: '#FF0000',
			confirmButtonText: "Eliminar",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			showCloseButton: true
		}).then( eleccion => {
			if (eleccion.isConfirmed){
				this.connector.Baja_Tipo(id).subscribe(res=>{
					Swal.fire({
						title: "¡El tipo fue borrado exitosamente!",
						icon: "success",
	        				confirmButtonColor: '#3085d6'
					});
					this.ngOnInit();

				}, err => {
						Swal.fire({
						title: "Error al eliminar el Tipo.",
						text: "Al intentar eliminar el tipo se produsco el ERROR: "+err.status+"\n "+err.message,
						icon: "error",
	        				confirmButtonColor: '#3085d6'
					});
				
				},()=>{})
			}
		
		});
	}
}
