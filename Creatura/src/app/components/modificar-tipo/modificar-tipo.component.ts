import { Component, OnInit } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet , Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ColorPickerComponent, ColorPickerService , ColorPickerDirective } from 'ngx-color-picker';

import { TipoComparado } from '../../interfaces/tipo-comparado';
import { ResultadoPeticionDefensas } from '../../interfaces/resultado-peticion-defensas';
import { Tipo } from '../../interfaces/tipo';

@Component({
  selector: 'app-modificar-tipo',
  imports: [ReactiveFormsModule , ColorPickerComponent , ColorPickerDirective],
  templateUrl: './modificar-tipo.component.html',
  styleUrl: './modificar-tipo.component.scss'
})
export class ModificarTipoComponent {

	datos_del_tipo_form : FormGroup;

	el_tipo : Tipo;

	el_color:string;	

	constructor(private connector: ConeccionService, private fb: FormBuilder,private route: ActivatedRoute, private router:Router){
	
		this.datos_del_tipo_form = this.fb.group({
			nombre: [null ,[Validators.required]]
		});

		
		this.el_tipo={
			id_tipo: 0,
			nombre_tipo: "default",
			color: "777777",
			icono: "",
			creador: "SYSTEM"
		};
		this.el_color=this.el_tipo.color;

	}


	url_iconos = 'http://localhost:41062/www/imagenes/tipos/';

	buffer_de_todos_los_tipos: Tipo[] | undefined;

	ngOnInit(): void{
	
		 this.connector.get_Todos_Los_Tipos().subscribe(res => {
		 	this.buffer_de_todos_los_tipos=res;
		 	this.Arreglar_url_imagenes();
			 if (this.buffer_de_todos_los_tipos==undefined){
				console.log("La lista de todos los tipos es undefined");
				this.router.navigate(["/listarTipos"]);
			 }
			 let se_encontro_tipo=false;
			this.route.queryParams.subscribe(params => {
				if(this.buffer_de_todos_los_tipos != undefined){
				for (let un_tipo of this.buffer_de_todos_los_tipos){
					if (un_tipo.id_tipo === params['id_Tipo']){
						this.el_tipo= un_tipo;
						se_encontro_tipo=true;
					}
				}
				}
			 if (this.el_tipo==undefined || ! se_encontro_tipo){
				 console.log("El tipo es undefined");
				this.router.navigate(["/listarTipos"]);
			 }else {

				this.datos_del_tipo_form.patchValue({
					nombre: this.el_tipo.nombre_tipo
				});
				this.el_color=this.el_tipo.color;
				console.log("Modificando el tipo: "+this.el_tipo.id_tipo);
			 }
			});
		 });
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
onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      //if(condicional para la extencion del archivo){
        this.el_tipo.icono = reader.result as string;
      //}
      
    };

    reader.readAsDataURL(file); 
    console.log(file);
  }
}

Selecciono_Color(color:string){
	//console.log("El color selecionado es: "+color);
	this.el_tipo.color=color.slice(1,color.length);
	//console.log("El color del tipo ahora es: "+this.el_tipo.color);

}

}
