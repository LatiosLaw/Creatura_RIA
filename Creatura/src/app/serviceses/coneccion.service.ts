import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConeccionService {
	private url_recursos = 'http://localhost:41062/www';
  private url = 'http://localhost:41062/www/api';
	private url_creatura = this.url + '/creatura';
  private urlUsuarios = this.url+'/usuario';
  private urlTipos = this.url+'/tipo';
  //private urlMovesets = 'http://localhost:3000/movesets';
  private urlHabilidades = this.url+"/habilidades";

	private header_para_get_imagenes = new HttpHeaders();

///creatura/:id_creatura
  constructor(private http: HttpClient) {
  	
	  this.header_para_get_imagenes.set("Access-Control-Allow-Origin", '*');
	  this.header_para_get_imagenes.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	  this.header_para_get_imagenes.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  

  }

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


	get_Tipos_Creados_Por(id:any){
		const url2 = this.urlTipos +"/creador/"+id;
		return this.http.get<any>(url2);
	}
	get_Tipo_Con_Id(id:any){
		const url2 = this.urlTipos + "/retornar_tipo.php?id_tipo=" + id;
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
	get_Todos_Los_Tipos(){
		return this.http.get<any>(this.urlTipos+"/retornarAll_Tipos.php");
	}

	Baja_Tipo(id:any){
		//Sustituir con la llamada a api adecuada.
		const url2 = this.urlTipos + "/baja.php?id_tipo="+id;
		return this.http.delete(url2);
	}
	Modificar_Tipo(id:any, tipo:any){
		//Sustituir con la llamada a api adecuada.
		const url2 = this.urlTipos+"/modificacion.php?id_tipo="+id;
		return this.http.post(url2, tipo);
	}

	Get_Imagen_Tipo(nombre:string) : Observable<Blob>{
		const url2 = this.url_recursos + "/imagenes/tipos/"+nombre;
		return this.http.get(url2 , {headers: this.header_para_get_imagenes, responseType: 'blob'});
	}
	
	Alta_Tipo(nuevo_tipo:any): Observable<any>{
		const url2 = this.urlTipos+"/alta.php";
		return this.http.post(url2, nuevo_tipo);
	}
}
