import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConeccionService {
  private url = 'http://localhost:3000/creaturas'; 
  private llave = new HttpHeaders({
    'x-api-key': 'reqres-free-v1' 
  });

  constructor(private http: HttpClient) {}

  // Método para crear un usuario con POST
  altaCreatura(datos: any): Observable<any> {
    return this.http.post(this.url, datos);
  }

  // Método para obtener usuarios con GET

  listadoCreatura(): Observable<any> {
   /* this.http.get<any[]>(this.url).subscribe(data => {
      console.log(data); // Aquí sí obtienes los datos reales
    });
*/
    return this.http.get<any[]>(this.url);
  }
}