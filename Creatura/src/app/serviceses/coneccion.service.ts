import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConeccionService {
  private url = 'http://localhost:3000/creaturas'; 
  private urlTipos = 'http://localhost:3000/tipos';
  private urlMoovesets = 'http://localhost:3000/movesets';
///creatura/:id_creatura
  constructor(private http: HttpClient) {}

  // Método para crear un usuario con POST
  altaCreatura(datos: any): Observable<any> {
    return this.http.post(this.url, datos);
  }

  // Método para obtener usuarios con GET

  listadoCreatura(): Observable<any> {
    return this.http.get<any[]>(this.url);
  }
  getCreatura(id:any){
    const url2 = this.url+ "/"+id;
     return this.http.get<any>(url2);
  }
  getCreaturaConTipos(id: any){
    const url2 = this.urlTipos + "/creaturas/" + id;
    return this.http.get<any>(url2);
  }
  listadoCreaturaConTipos(): Observable<any> {
    const url2 = this.urlTipos + "/creaturas";
     return this.http.get<any[]>(url2);
   }
   eliminarCreatura(id:any){
    const url2 = this.url + "/"+id;
    console.log(url2);
     this.http.delete<any[]>(url2).subscribe(data => {
      console.log(data);
    });
   }
   getMoveset(id:any){
    const url2 = this.urlMoovesets + "/full/creatura/" + id;
    return this.http.get<any>(url2);
   }
  devolberTipo(id:any): Observable<any> {
     const url2 = this.urlTipos + "/"+id;
     
     return this.http.get<any[]>(url2);
   }

}