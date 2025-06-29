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
import {TiposDeResistencias} from '../../interfaces/tipos-de-resistencias'

@Component({
  selector: 'app-modificar-tipo',
  imports: [ReactiveFormsModule , ColorPickerComponent , ColorPickerDirective],
  templateUrl: './modificar-tipo.component.html',
  styleUrl: './modificar-tipo.component.scss'
})
export class ModificarTipoComponent {



	datos_del_tipo_form : FormGroup;

	el_tipo : Tipo;

	buffer_de_todos_los_tipos: Tipo[] =[];

	el_color:string;

	el_nombre_original:string;	

	se_modifico_icono:boolean;

	resistencias: number[][] = [];

	resistencias_Tipo: TiposDeResistencias;

	Autodefensa : number;

	creador:string;


	constructor(private connector: ConeccionService, private fb: FormBuilder,private route: ActivatedRoute, private router:Router){
	
		this.se_modifico_icono=false;
		this.datos_del_tipo_form = this.fb.group({
			nombre: ["" ,[Validators.required]]
		});

		
		this.el_tipo={
			id_tipo: 0,
			nombre_tipo: "default",
			color: "777777",
			icono: "",
			creador: "SYSTEM"
		};
		this.el_color='#'+this.el_tipo.color;
		this.el_nombre_original = this.el_tipo.nombre_tipo;

		this.resistencias.push([]);
		this.resistencias.push([]);
		this.resistencias.push([]);
		this.resistencias.push([]);

		this.resistencias_Tipo={
			inmunidades:[],
			resistencias:[],
			neutralidades:[],
			debilidades:[]
		}


		this.Autodefensa=1;

		this.creador=this.el_tipo.creador;

	}


	url_iconos = 'http://localhost:41062/www/imagenes/tipos/';


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
				this.el_color='#'+this.el_tipo.color;
				this.el_nombre_original = this.el_tipo.nombre_tipo;
				let url_icono_separado = this.el_tipo.icono.split('/');
				let el_nombre_del_icono = url_icono_separado[url_icono_separado.length-1];
				this.connector.Get_Imagen_Tipo(el_nombre_del_icono).subscribe(res =>{
					
					let file:Blob = res;

				const reader = new FileReader();

				reader.onload = () => {
					//if(condicional para la extencion del archivo){
					this.el_tipo.icono = reader.result as string;
					//}

				};

				reader.readAsDataURL(file);

				console.log(this.el_tipo.icono);	

				
				}, err =>{
					console.log("Hubo un Error al importar el icono.\nCodigo: "+err.status+"\n"+err.message);
				}
				);
				this.connector.Mostar_Tipo(this.el_tipo.id_tipo).subscribe((res:any) =>{
					let la_respuesta:ResultadoPeticionDefensas=res;
					let las_defensas:any[]= la_respuesta.defensas;
					las_defensas.forEach((el_otro_tipo:TipoComparado) =>{
						if(el_otro_tipo.id_tipo==this.el_tipo.id_tipo){
							this.Autodefensa=el_otro_tipo.multiplicador;
						}
						switch(el_otro_tipo.multiplicador){
							case 0:{
								this.resistencias[0].push(el_otro_tipo.id_tipo);
								let tipo_tmp=this.buffer_de_todos_los_tipos.find(t=>t.id_tipo==el_otro_tipo.id_tipo);
								if (tipo_tmp!=undefined){
								this.resistencias_Tipo.inmunidades.push(tipo_tmp);
								}
								break;
							}
							case 0.5:{
								this.resistencias[1].push(el_otro_tipo.id_tipo);
								let tipo_tmp=this.buffer_de_todos_los_tipos.find(t=>t.id_tipo==el_otro_tipo.id_tipo);
								if (tipo_tmp!=undefined){
								this.resistencias_Tipo.resistencias.push(tipo_tmp);
								}
								break;
							}
							case 1:{
								this.resistencias[2].push(el_otro_tipo.id_tipo);
								let tipo_tmp=this.buffer_de_todos_los_tipos.find(t=>t.id_tipo==el_otro_tipo.id_tipo);
								if (tipo_tmp!=undefined){
								this.resistencias_Tipo.neutralidades.push(tipo_tmp);
								}
								break;
							}
							case 2:{
								this.resistencias[3].push(el_otro_tipo.id_tipo);
								let tipo_tmp=this.buffer_de_todos_los_tipos.find(t=>t.id_tipo==el_otro_tipo.id_tipo);
								if (tipo_tmp!=undefined){
								this.resistencias_Tipo.debilidades.push(tipo_tmp);
								}
								break;
							}
						}
					
					
					});
					console.log("El tipo selecionado tiene "+this.resistencias_Tipo.debilidades.length+" debilidades.")
					console.log("El tipo selecionado tiene "+this.resistencias_Tipo.inmunidades.length+" inmunidades.")
					console.log("El tipo selecionado tiene "+this.resistencias_Tipo.neutralidades.length+" neutralidades.")
					console.log("El tipo selecionado tiene "+this.resistencias_Tipo.resistencias.length+" resistencias.")
				
				
				});
				console.log("Modificando el tipo: "+this.el_tipo.id_tipo);

			 }
			});
		 });

		 let tmp_1 = this.datos_del_tipo_form.get('nombre');
		 if (tmp_1!= null){
		tmp_1.valueChanges.subscribe(cambio =>{
			this.el_tipo.nombre_tipo=cambio;
		});
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
    this.se_modifico_icono=true;
    console.log(file);
  }
}

Selecciono_Color(color:string){
	//console.log("El color selecionado es: "+color);
	this.el_color=color;
	this.el_tipo.color=color.slice(1,color.length);
	//console.log("El color del tipo ahora es: "+this.el_tipo.color);

}

Get_Datos_de_Modificacion():any{
	
	let las_debilidades : number[] = [];
	let las_resistencias : number[] = [];
	let las_inmunidades : number[]=[];

	for (let un_tipo of this.resistencias_Tipo.debilidades){
		las_debilidades.push(un_tipo.id_tipo);
	
	}
	for (let un_tipo of this.resistencias_Tipo.resistencias){
		las_resistencias.push(un_tipo.id_tipo);
	}
	
	for (let un_tipo of this.resistencias_Tipo.inmunidades){
		las_inmunidades.push(un_tipo.id_tipo);
	}
	

	const nueva_imagen : string = (this.se_modifico_icono) ? this.el_tipo.icono : "";
	let datos_modificacion = {
		id_tipo : this.el_tipo.id_tipo,
		nombre_original : this.el_nombre_original,
		nombre : this.el_tipo.nombre_tipo,
		color_hex : this.el_tipo.color,
		self_int: this.Autodefensa,
		icono_base64: this.el_tipo.icono,
		creador: this.el_tipo.creador,
		debilidades: las_debilidades,
		resistencias: las_resistencias,
		inmunidades: las_inmunidades


	}

	return datos_modificacion;

}

Quitar_Debilidad(id:number){
	let Tipo_tmp_index:number = this.resistencias_Tipo.debilidades.findIndex(t => t.id_tipo==id);
	let Tipo_tmp : Tipo | undefined = this.resistencias_Tipo.debilidades.at(Tipo_tmp_index);
	if (Tipo_tmp!=undefined){
	this.resistencias_Tipo.debilidades.splice(Tipo_tmp_index,1);
	this.resistencias_Tipo.neutralidades.push(Tipo_tmp);
	if(Tipo_tmp.id_tipo==this.el_tipo.id_tipo){
		this.Autodefensa=1;
	}
	}
}
Quitar_Resistencia(id:number){
	let Tipo_tmp_index:number = this.resistencias_Tipo.resistencias.findIndex(t => t.id_tipo==id);
	let Tipo_tmp : Tipo | undefined = this.resistencias_Tipo.resistencias.at(Tipo_tmp_index);
	if (Tipo_tmp!=undefined){
	this.resistencias_Tipo.resistencias.splice(Tipo_tmp_index,1);
	this.resistencias_Tipo.neutralidades.push(Tipo_tmp);
	if(Tipo_tmp.id_tipo==this.el_tipo.id_tipo){
		this.Autodefensa=1;
	}
	}
}
Quitar_Inmunidad(id:number){
	let Tipo_tmp_index:number = this.resistencias_Tipo.inmunidades.findIndex(t => t.id_tipo==id);
	let Tipo_tmp : Tipo | undefined = this.resistencias_Tipo.inmunidades.at(Tipo_tmp_index);
	if (Tipo_tmp!=undefined){
	this.resistencias_Tipo.inmunidades.splice(Tipo_tmp_index,1);
	this.resistencias_Tipo.neutralidades.push(Tipo_tmp);
	if(Tipo_tmp.id_tipo==this.el_tipo.id_tipo){
		this.Autodefensa=1;
	}
	}
}

Agregar_Debilidad(id:number){
	let tipo_tmp_index:number = this.resistencias_Tipo.neutralidades.findIndex(t => t.id_tipo==id);
	let tipo_tmp : Tipo | undefined = this.resistencias_Tipo.neutralidades.at(tipo_tmp_index);
	if (tipo_tmp!= undefined){
		this.resistencias_Tipo.neutralidades.splice(tipo_tmp_index,1);
		this.resistencias_Tipo.debilidades.push(tipo_tmp);
	if(tipo_tmp.id_tipo==this.el_tipo.id_tipo){
		this.Autodefensa=2;
	}
	}
}
Agregar_Inmunidad(id:number){
	let tipo_tmp_index:number = this.resistencias_Tipo.neutralidades.findIndex(t => t.id_tipo==id);
	let tipo_tmp : Tipo | undefined = this.resistencias_Tipo.neutralidades.at(tipo_tmp_index);
	if (tipo_tmp!= undefined){
		this.resistencias_Tipo.neutralidades.splice(tipo_tmp_index,1);
		this.resistencias_Tipo.inmunidades.push(tipo_tmp);
	if(tipo_tmp.id_tipo==this.el_tipo.id_tipo){
		this.Autodefensa=0;
	}
	}
}
Agregar_Resistencia(id:number){
	let tipo_tmp_index:number = this.resistencias_Tipo.neutralidades.findIndex(t => t.id_tipo==id);
	let tipo_tmp : Tipo | undefined = this.resistencias_Tipo.neutralidades.at(tipo_tmp_index);
	if (tipo_tmp!= undefined){
		this.resistencias_Tipo.neutralidades.splice(tipo_tmp_index,1);
		this.resistencias_Tipo.resistencias.push(tipo_tmp);
	if(tipo_tmp.id_tipo==this.el_tipo.id_tipo){
		this.Autodefensa=0.5;
	}
	}
}

Confirmar(){
	Swal.fire({
		title: "Modificar tipo",
		text: "¿Desea confirmar los cambios?",
		confirmButtonColor: '#3085d6',
		confirmButtonText: "Modificar",
		showCancelButton: true,
		cancelButtonText: "Cancelar",
		showCloseButton: true,
		cancelButtonColor: '#FF0000',
	}).then(eleccion => {
		if(eleccion.isConfirmed){
			let los_datos_a_enviar:any = this.Get_Datos_de_Modificacion();
			console.log("Los datos de la modificaion son: \n"+los_datos_a_enviar.toString());
			this.connector.Modificar_Tipo(this.el_tipo.id_tipo, los_datos_a_enviar).subscribe(
			res => {
				
				Swal.fire({
					title: "¡El tipo fue modificado exitosamente!",
					icon: "success",
					draggable: true,
					confirmButtonColor: '#3085d6'
				});
				this.router.navigate(["/listarTipos"]);
				},
			err => {
				
				Swal.fire({
				
						title: "Error al Modificar el Tipo.",
						text: "Al intentar modificar el tipo se produsco el ERROR: "+err.status+"\n "+err.message,
						icon: "error",
	        				confirmButtonColor: '#3085d6'
				
				});

			}
					 );

			}
	});
}


}
