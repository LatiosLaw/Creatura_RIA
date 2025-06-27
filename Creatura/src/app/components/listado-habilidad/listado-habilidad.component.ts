import { Component } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatPaginatorIntl } from '@angular/material/paginator';

import {customPaginator} from '../../../cosas/matPag';

@Component({
  selector: 'app-listado-habilidad',
  imports: [RouterOutlet,RouterLink,CommonModule, NgOptimizedImage,MatPaginatorModule],
  templateUrl: './listado-habilidad.component.html',
  styleUrl: './listado-habilidad.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class ListadoHabilidadComponent {

  
 habilidades: any[] = [];
 paginadas: any[] = [];

 paginaActual = 0;
 tamaPagina = 8;

  constructor(private connector: ConeccionService) {
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      this.usuarioActual = JSON.parse(usuarioData);
    }
  }
  usuarioActual:any;
  
  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.tamaPagina = event.pageSize;
    this.actualizarListaPaginada();
  }
  actualizarListaPaginada(){
   // alert(this. paginaActual + "///" + this.tamaPagina);
    const start = this.paginaActual * this.tamaPagina;
    const end = start + this.tamaPagina;
    this.paginadas = this.habilidades.slice(start, end);
   
  }

  eliminarHabilidad(idCreatura:any){
    
    Swal.fire({
      title: "Está seguro que desea eliminar esta Habilidad",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.connector.Baja_Habilidad(idCreatura).subscribe({
          next: () => {
            this.cargarHabilidadesLista(); // recarga el listado
            Swal.fire("Eliminada", "La habilidad ha sido eliminada.", "success");
          },
          error: () => {
            Swal.fire("Error", "No se pudo eliminar la habilidad.", "error");
          }
        });
      }
    });
    
  }
mostrarJSHabilidad(id: any) {
  this.connector.getHabilidad(id).subscribe(data => {
    Swal.fire({
      title: `Exportación de la Habilidad con el id: ${id}`,
      html: `<pre style="text-align: left;">
{
  "id_habilidad": ${JSON.stringify(data.habilidad.id_habilidad)},
  "nombre": ${JSON.stringify(data.habilidad.nombre_habilidad)},
  "id_tipo": ${JSON.stringify(data.habilidad.id_tipo_habilidad)},
  "descripcion": ${JSON.stringify(data.habilidad.descripcion)},
  "categoria": ${JSON.stringify(data.habilidad.categoria_habilidad)},
  "potencia": ${JSON.stringify(data.habilidad.potencia)},
  "creador": ${JSON.stringify(data.habilidad.creador)}
}
      </pre>`,
      confirmButtonColor: '#3085d6',
    });
  });
}

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }
  cargarHabilidadesLista(){
    this.connector.Listar_Habilidades_Creadas_Por(this.usuarioActual.nickname).subscribe((res) => {
      this.habilidades = res.habilidades;
      this.actualizarListaPaginada();

    });
  }
  ngOnInit(): void {

    this.connector.Listar_Habilidades_Creadas_Por(this.usuarioActual.nickname).subscribe((res) => {
      this.habilidades = res.habilidades;
      console.log(this.habilidades);
      this.actualizarListaPaginada();
    });


}
}
