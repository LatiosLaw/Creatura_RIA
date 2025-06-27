import { Component, OnInit, ViewChild} from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatPaginatorIntl } from '@angular/material/paginator';

import {customPaginator} from '../../../cosas/matPag';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
@Component({
  selector: 'app-listado-creaturas-system',
  imports: [CommonModule,RouterLink, MatPaginatorModule, PiePaginaComponent],
  templateUrl: './listado-creaturas-system.component.html',
  styleUrl: './listado-creaturas-system.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class ListadoCreaturasSystemComponent{

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  creaturas: any[] = [];
  usuarios: any[] = [];

  paginadas: any[] = [];

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
    this.paginadas = this.creaturas.slice(start, end);
  }

  onImgErrorCreatura(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }

  ngOnInit(): void {
    this.connector.listadoCreaturaConTipos().subscribe((res) => {

      const filtradas = res.filter((creatura: any) => creatura.creador === 'SYSTEM');
      this.randomizador(filtradas);
      this.creaturas = filtradas;
      this.actualizarListaPaginada();
    });
  }

  private randomizador(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
  }

}
