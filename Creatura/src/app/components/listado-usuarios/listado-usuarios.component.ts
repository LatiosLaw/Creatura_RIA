import { Component, OnInit } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatPaginatorIntl } from '@angular/material/paginator';

import {customPaginator} from '../../../cosas/matPag';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';


@Component({
  selector: 'app-listado-usuarios',
  imports: [RouterLink,CommonModule,MatPaginatorModule, PiePaginaComponent],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class ListadoUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  paginados: any[] = [];

  paginaActual = 0;
  tamaPagina = 8;
  constructor(private connector: ConeccionService) {}
  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.tamaPagina = event.pageSize;
    this.actualizarListaPaginada();
  }
  actualizarListaPaginada(){
   // alert(this. paginaActual + "///" + this.tamaPagina);
    const start = this.paginaActual * this.tamaPagina;
    const end = start + this.tamaPagina;
    this.paginados = this.usuarios.slice(start, end);
  }
  onImgErrorUsuario(event: Event) {
    const element= event.target as HTMLImageElement;
    element.src = 'defoultUser.png'; // Ruta de imagen por defecto
  }

  ngOnInit(): void {
    this.connector.listarUsuarios().subscribe((res) => {
      this.randomizador(res);
      this.usuarios = res;
      console.log(this.usuarios);
      this.actualizarListaPaginada();
    })
  }

  private randomizador(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
  }
}