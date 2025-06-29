import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../serviceses/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatPaginatorIntl } from '@angular/material/paginator';

import {customPaginator} from '../../../cosas/matPag';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
@Component({
  selector: 'app-ver-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule,MatPaginatorModule, PiePaginaComponent],
  templateUrl: './ver-usuario.component.html',
  styleUrl: './ver-usuario.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class VerUsuarioComponent {
  usuarioLogueado: any = null;
  informacion_usuario: any = null;
  creaturas: any = null;
  nickname_usuario: string = '';
  paginadas: any[] = [];
  paginaActual = 0;
  tamaPagina = 8;

  constructor(private route: ActivatedRoute, private router: Router, private usuarioControlador: UsuarioService) {
    const data = localStorage.getItem('usuarioActual');
    if (data) {
      this.usuarioLogueado = JSON.parse(data);
    }

    this.route.params.subscribe(params => {
      this.nickname_usuario = params['nickname'];
      console.log(this.nickname_usuario);
      this.mostrarUsuario();
      this.mostrarCreaturas();
    });
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
    this.paginadas = this.creaturas.creaturas.slice(start, end);
  }
  mostrarUsuario(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usuarioControlador.retornarUsuario(this.nickname_usuario).subscribe(data => {

        if (data) {
            this.informacion_usuario = data;
            console.log(this.usuarioLogueado);
          }

        resolve();
      });
    });
  }

  mostrarCreaturas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usuarioControlador.retornarCreaturasUsuario(this.nickname_usuario).subscribe(data => {

       if (data) {
            this.creaturas = data;
            console.log(this.creaturas);
            this.actualizarListaPaginada();
          }
        resolve();
      });
    });
  }

ngOnInit(): void {
  this.mostrarUsuario();
  this.mostrarCreaturas();
}

eliminarUsuario(): void {
  if (!this.usuarioLogueado?.nickname) return;

  const confirmacion = confirm('¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer.');

  if (confirmacion) {
    this.usuarioControlador.borrarUsuario(this.usuarioLogueado.nickname).subscribe({
      next: (res) => {
        console.log('Eliminación exitosa:', res);
        localStorage.clear();
        this.router.navigate(['inicio']);
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      }
    });
  }
}
onImgError(event: Event) {
  const element = event.target as HTMLImageElement;
  element.src = 'defoult.png'; // Ruta de imagen por defecto
}
}
