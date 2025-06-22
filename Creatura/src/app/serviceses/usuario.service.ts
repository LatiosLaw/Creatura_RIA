import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlUsuarios = 'http://localhost/Creatura_PHP/api/usuario';
  private urlCreaturas = 'http://localhost/Creatura_PHP/api/creatura';

  constructor(private http: HttpClient) {}

  registrarUsuario(datos: any): Observable<any> {
    return this.http.post(this.urlUsuarios + "/alta.php", datos);
  }

 loginUsuario(nickname: string, contrasena: string): Observable<any> {
  
  const body = {
    nickname: nickname,
    contra: contrasena
  };

  return this.http.post<any>(this.urlUsuarios + "/login.php", body).pipe(
    map(respuesta => {
      if (respuesta.resultado === 'ok' && respuesta.usuario) {
        // Guardar en localStorage (sin contraseña)
        localStorage.setItem('usuarioActual', JSON.stringify({
          nickname: respuesta.usuario.nickname,
          correo: respuesta.usuario.correo,
          biografia: respuesta.usuario.biografia,
          foto: respuesta.usuario.foto
        }));
        return respuesta.usuario;
      } else {
        throw new Error(respuesta.mensaje || 'Error en el login');
      }
    }),
    catchError(error => {
      console.error('Error en loginUsuario:', error);
      return throwError(() => error);
    })
  );
}

retornarUsuario( nickname: any){
    const url_completa = this.urlUsuarios + "/retornar_usuario.php?nickname=" + nickname;
    return this.http.get<any>(url_completa);
  }

retornarCreaturasUsuario( creador: any){
    const url_completa = this.urlCreaturas + "/retornar_creatura_con_filtros.php?creador=" + creador;
    return this.http.get<any>(url_completa);
  }

  borrarUsuario(nickname: string): Observable<any> {
  const body = {
    nickname,
    metodo: 'DELETE'
  };

  return this.http.post(`${this.urlUsuarios}/baja.php`, body);
}

modificarUsuario(data: any) {
    return this.http.post(`${this.urlUsuarios}/modificacion.php`, data);
  }

}
