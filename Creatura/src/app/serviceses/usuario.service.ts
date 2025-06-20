import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  registrarUsuario(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }

  loginUsuario(nickname: string, contrasena: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${nickname}`).pipe(
      map(usuario => {
        if (!usuario) {
          throw new Error('Usuario no encontrado');
        }
  
        if (usuario.contraseña !== contrasena) {
          throw new Error('Contraseña incorrecta');
        }
  
        // Guardar en localStorage (solo como ejemplo, no es seguro guardar contraseñas)
        localStorage.setItem('usuarioActual', JSON.stringify({
          nickname: usuario.nickname,
          correo: usuario.correo,
          biografia: usuario.biografia,
          tipo: usuario.tipo
        }));
  
        return usuario;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
