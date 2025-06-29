import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl : string = 'http://localhost:41062/www/api/usuario';

  constructor(private http: HttpClient) {}

  registrarUsuario(datos: any): Observable<any> {
    return this.http.post(this.apiUrl+"/alta.php", datos);
  }

  loginUsuario(nickname: string, contrasena: string): Observable<any> {
	  let body : any = {nickname:nickname, contra: contrasena };
    return this.http.post<any>(this.apiUrl+"/login.php", body ).pipe(
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
}
