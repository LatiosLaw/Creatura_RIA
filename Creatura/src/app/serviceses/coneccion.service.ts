import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConeccionService {
  private url = 'http://localhost:41062/www/api';
	private url_creatura = this.url + '/creatura';
  private urlUsuarios = this.url+'/usuario';
  private urlTipos = this.url+'/tipo';
  //private urlMovesets = 'http://localhost:3000/movesets';
  private urlHabilidades = this.url+"/habilidades";
///creatura/:id_creatura
  constructor(private http: HttpClient) {}

  // Método para crear un usuario con POST
  /*altaCreatura(datos: any): Observable<any> {
    return this.http.post(this.url_creatura datos);
  }*/

  // Método para obtener usuarios con GET

  getCreatura(id:any){
    const url2 = this.url_creatura+ "/retornar_creatura.php?id_creatura=" + id;
    //retornar_creatura.php?nombre_creatura=Blastoise&creador=SYSTEM
    return this.http.get<any>(url2);
  }
  getCreaturaConTipos( id: any){
    const url2 = this.url_creatura+ "/retornar_creatura.php?id_creatura=" + id;
    //retornar_creatura.php?nombre_creatura=Blastoise&creador=SYSTEM
    return this.http.get<any>(url2);
  }
  listadoCreaturaConTipos(): Observable<any> {
    const url2 = this.url_creatura+ "/listado.php";
     return this.http.get<any[]>(url2);
   }
   eliminarCreatura(id:any){
    const url2 = this.url_creatura+ "/baja.php";
    const body = '{"id_creatura":' + id +'}';
    return this.http.post<any>(url2,body);
   }
   getMoveset(id:any){
    const url2 = this.url_creatura+ "/retornar_habilidades.php?id_creatura=" + id;
    return this.http.get<any>(url2);
   }

   getHabilidadesConTipos(){
    const url2 = this.urlHabilidades + "/getAll_habilidades.php";
    return this.http.get<any>(url2);
   }

   getTipos(){
    return this.http.get<any[]>(this.urlTipos+ "/retornarAll_tipos.php");
   }
	get_Todos_Los_Tipos(){
		return this.http.get<any>(this.urlTipos+"/retornarAll_Tipos.php");
	}
	Alta_Tipo(nuevo_tipo:any): Observable<any>{
		return this.http.post(this.urlTipos, nuevo_tipo);
	}
	Baja_Tipo(id:any){
		const url2 = this.urlTipos + "/" + id;
		return this.http.delete(url2);
	}

	Modificar_Tipo(id:any, tipo:any){
		const url2 = this.urlTipos + "/"+ id;
		return this.http.put(url2, tipo);
	}

	get_Tipos_Creados_Por(id:any){
		const url2 = this.urlTipos +"/creador/"+id;
		return this.http.get<any>(url2);
	}
	get_Tipo_Con_Id(id:any){
		const url2 = this.urlTipos + "/" + id;
		return this.http.get(url2);
	}

	Alta_Habilidades(nueva_habilidad:any){
		return this.http.post(this.urlHabilidades,nueva_habilidad);
	}
	
	Baja_Habilidad(id:any){
		const url2 = this.urlHabilidades + "/" + id;
		return this.http.delete(url2);
	}

	Modificar_Habilidad(id:any, habilidad:any){
		const url2 = this.urlHabilidades + "/" + id;
		return this.http.put(url2,habilidad);
	}

	Listar_Habilidades(){
		return this.http.get(this.urlHabilidades);
	}
	
	Listar_Habilidades_Creadas_Por(id:any){	
		const url2 = this.urlHabilidades + "/creador/" + id;
		return this.http.get(url2);
	}

	Listar_Habilidades_Por_Tipo(id:any){	
		const url2 = this.urlHabilidades + "/tipo/" + id;
		return this.http.get(url2);
	}

  listarUsuarios(){
    return this.http.get<any[]>(this.urlUsuarios);
  }

  Mostar_Tipo(id:any){
  	const url2 = this.url_creatura +"/retornar_calculo_defensivo.php?tipo1=" + id;
	return this.http.get(url2);
  }
	
}
