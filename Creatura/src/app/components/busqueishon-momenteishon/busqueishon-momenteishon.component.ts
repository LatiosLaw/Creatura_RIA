import { Component,OnInit  } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatPaginatorIntl } from '@angular/material/paginator';

import {customPaginator} from '../../../cosas/matPag';

@Component({
  selector: 'app-busqueishon-momenteishon',
  imports: [RouterOutlet,RouterLink,CommonModule, NgOptimizedImage, MatPaginatorModule],
  templateUrl: './busqueishon-momenteishon.component.html',
  styleUrl: './busqueishon-momenteishon.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class BusqueishonMomenteishonComponent implements OnInit{
  constructor(private connector: ConeccionService,private route: ActivatedRoute) {
    //const usuarioData = localStorage.getItem('usuarioActual');
   // if (usuarioData) {
    //  this.usuarioActual = JSON.parse(usuarioData);
    //}
  }
  usuarioActual:any;
  creaturas: any[]=[];
  creaturasDeUsuarios: any[]=[];
  usuarios: any[]=[];
  creaturasTipo:any[]=[];

  paginadas_Crea: any[] = [];
  paginaActual_Crea = 0;
  tamaPagina_Crea = 8;

  paginadas_Tipo: any[] = [];
  paginaActual_Tipo = 0;
  tamaPagina_Tipo = 8;

  paginadas_Usu: any[] = [];
  paginaActual_Usu = 0;
  tamaPagina_Usu = 8;

  paginadas_CreaUsu: any[] = [];
  paginaActual_CreaUsu = 0;
  tamaPagina_CreaUsu = 8;


  datiBuscar:any;
  mostrarNormal:boolean=true;
  error:boolean=false;

  paginarCrea(event: PageEvent): void {
    this.paginaActual_Crea = event.pageIndex;
    this.tamaPagina_Crea = event.pageSize;
    this.actualizarListaPaginadaCrea();
  }
  actualizarListaPaginadaCrea(){
   // alert(this. paginaActual + "///" + this.tamaPagina);
    const start = this.paginaActual_Crea * this.tamaPagina_Crea;
    const end = start + this.tamaPagina_Crea;
    this.paginadas_Crea = this.creaturas.slice(start, end);
  }

  paginarCreaUsu(event: PageEvent): void {
    this.paginaActual_CreaUsu = event.pageIndex;
    this.tamaPagina_CreaUsu = event.pageSize;
    this.actualizarListaPaginadaUsu();
  }
  actualizarListaPaginadaCreaUsu(){
   // alert(this. paginaActual + "///" + this.tamaPagina);
    const start = this.paginaActual_CreaUsu  * this.tamaPagina_CreaUsu ;
    const end = start + this.tamaPagina_CreaUsu;
    this.paginadas_CreaUsu = this.creaturasDeUsuarios.slice(start, end);
  }

  paginarTipo(event: PageEvent): void {
    this.paginaActual_Tipo = event.pageIndex;
    this.tamaPagina_Tipo = event.pageSize;
    this.actualizarListaPaginadaTipo();
  }
  actualizarListaPaginadaTipo(){
   // alert(this. paginaActual + "///" + this.tamaPagina);
    const start = this.paginaActual_Tipo * this.tamaPagina_Tipo;
    const end = start + this.tamaPagina_Tipo;
    this.paginadas_Tipo = this.creaturasTipo.slice(start, end);
  }

  paginarUsu(event: PageEvent): void {
    this.paginaActual_Usu = event.pageIndex;
    this.tamaPagina_Usu = event.pageSize;
    this.actualizarListaPaginadaUsu();
  }
  actualizarListaPaginadaUsu(){
   // alert(this. paginaActual + "///" + this.tamaPagina);
    const start = this.paginaActual_Usu * this.tamaPagina_Usu;
    const end = start + this.tamaPagina_Usu;
    this.paginadas_Usu = this.usuarios.slice(start, end);
  }



















  cargarCosas(){
    
   this.connector.buscar(this.datiBuscar).subscribe(
    (res) => {
      this.error = false;
    console.log("hola");
    this.creaturas = res.creaturas;

    this.creaturasDeUsuarios = res.creaturasUsr;
    this.usuarios = res.usuarios;
    console.log("hola");
    this.creaturasTipo = res.creaturasTipo;
    if(this.creaturasTipo){
      this.mostrarNormal = false;
    }else{
      this.mostrarNormal = true;
    }
    this.actualizarListaPaginadaCreaUsu();
    this.actualizarListaPaginadaCrea();
    this.actualizarListaPaginadaUsu();
    this.actualizarListaPaginadaTipo();



   // console.log(this.creaturas);
  },
  (error) => {
    this.error = true;
    console.error("Error al buscar:", error);
    this.creaturas = [];
    this.creaturasDeUsuarios = [];
    this.usuarios = [];
    this.creaturasTipo = [];
    // Código que querés ejecutar si falla:
    this.mostrarNormal = true;
    //Swal.fire("Error", "No se pudieron obtener los datos de búsqueda.", "error");
  }


);
  console.log("hola");
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.datiBuscar = params['datoBusqueda'];
        this.cargarCosas();
        this.actualizarListaPaginadaCrea();
        this.actualizarListaPaginadaCreaUsu();
        this.actualizarListaPaginadaTipo();
        this.actualizarListaPaginadaUsu();
      })

}
onImgErrorCreatura(event: Event) {
  const element1 = event.target as HTMLImageElement;
  element1.src = 'defoult.png'; // Ruta de imagen por defecto
}

onImgErrorUsuario(event: Event) {
  const element2 = event.target as HTMLImageElement;
  element2.src = 'defoultUser.png'; // Ruta de imagen por defecto
}
}
