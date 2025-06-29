import { Component,OnInit  } from '@angular/core';
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
  selector: 'app-listado-creatura',
  imports: [RouterOutlet,RouterLink,CommonModule, NgOptimizedImage,MatPaginatorModule],
  templateUrl: './listado-creatura.component.html',
  styleUrl: './listado-creatura.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class ListadoCreaturaComponent implements OnInit{
  creaturas: any[] = [];
  paginadas: any[] = [];

  paginaActual = 0;
  tamaPagina = 8;

  constructor(private connector: ConeccionService) {
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      this.usuarioActual = JSON.parse(usuarioData);
    }
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.tamaPagina = event.pageSize;
    this.actualizarListaPaginada();
  }
  actualizarListaPaginada(){
   // alert(this. paginaActual + "///" + this.tamaPagina);
    const start = this.paginaActual * this.tamaPagina;
    const end = start + this.tamaPagina;
    this.paginadas = this.creaturas.slice(start, end);
  }

  usuarioActual:any;

  eliminarCreatura(idCreatura:any){
    
    Swal.fire({
      title: "Está seguro que desea eliminar esta Creatura™",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.connector.eliminarCreatura(idCreatura).subscribe({
          next: () => {
            this.cargarCreaturasLista(); // recarga el listado
            Swal.fire("Eliminada", "La creatura ha sido eliminada.", "success");

          },
          error: () => {
            Swal.fire("Error", "No se pudo eliminar la creatura.", "error");
          }
        });
      }
    });
    
  }
  mostrarJScreatura(id: any) {
    this.connector.getCreatura(id).subscribe(data => {
      Swal.fire({
        title: 'Exportación de la creatura con el id: ' + id,
        html: `<pre style="text-align: left;">
        "id_creatura": ${data.creatura.id_creatura},
        "nombre_creatura": ${data.creatura.nombre},
        "id_tipo1": ${data.creatura.id_tipo1},
        "id_tipo2": ${data.creatura.id_tipo2},
        "descripcion": ${data.creatura.descripcion},
        "hp": ${data.creatura.hp},
        "atk": ${data.creatura.atk},
        "def": ${data.creatura.def},
        "spa": ${data.creatura.spa},
        "sdef": ${data.creatura.sdef},
        "spe": ${data.creatura.spe},
        "creador": ${data.creatura.creador},
        "imagen": ${data.creatura.imagen},
        "publico": ${data.creatura.publico}
        </pre>`,
        confirmButtonColor: '#3085d6',
      });
    });
  }
  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }
  cargarCreaturasLista(){
    this.connector.listadoCreaturaConTiposDeUsuario(this.usuarioActual.nickname).subscribe((res) => {
      this.creaturas = res.creaturas;
      this.actualizarListaPaginada();
    });
  }
  ngOnInit(): void {
    //this.connector.eliminarCreatura(1);

    this.connector.listadoCreaturaConTiposDeUsuario(this.usuarioActual.nickname).subscribe((res) => {
      this.creaturas = res.creaturas;
      console.log(this.creaturas);
      this.actualizarListaPaginada();
    });
   // this.actualizarListaPaginada();

}
}
