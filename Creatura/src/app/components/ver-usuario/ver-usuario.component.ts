import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../serviceses/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ver-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-usuario.component.html',
  styleUrl: './ver-usuario.component.scss'
})
export class VerUsuarioComponent {
  usuarioLogueado: any = null;
  informacion_usuario: any = null;
  creaturas: any = null;
  nickname_usuario: string = '';

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
        localStorage.clear;
        this.router.navigate(['inicio']);
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      }
    });
  }
}

}
