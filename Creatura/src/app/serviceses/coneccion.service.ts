import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConeccionService {
  private header_para_get_imagenes = new HttpHeaders();

  private urlImagenes = "http://localhost/Creatura_PHP/imagenes/tipos/";
  private urlCreatura = "http://localhost/Creatura_PHP/api/creatura";
  private urlTipos = "http://localhost/Creatura_PHP/api/tipo";
private urlUsuario = "http://localhost/Creatura_PHP/api/usuario";
private urlHabilidades = "http://localhost/Creatura_PHP/api/habilidades";
  private urlBuscar = "http://localhost/Creatura_PHP/api/busqueda";
///creatura/:id_creatura
  constructor(private http: HttpClient) {
	  this.header_para_get_imagenes.set("Access-Control-Allow-Origin", '*');
	  this.header_para_get_imagenes.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	  this.header_para_get_imagenes.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  }
  CrearCreatura(datos: any): Observable<any> {
    return this.http.post(this.urlCreatura + "/alta.php", datos);
  }
  modificarCreatura(datos:any){
	return this.http.post(this.urlCreatura + "/modificacion.php", datos);
  }
  modificarCalificacion(datos:any){
	const url2 = this.urlCreatura + "/rating.php";
    const body = datos;
    return this.http.post<any>(url2,body);
  }
  chequearSiRateo(datos:any){
	const url2 = this.urlCreatura + "/devolverSiRateo.php";
    const body = datos;
    return this.http.post<any>(url2,body);
  }
  getCalculaDef(tipo1:any,tipo2:any){
    console.log("tipo2");
    console.log(tipo2);
    const url2 = this.urlCreatura + "/retornar_calculo_defensivo.php?tipo1=" + tipo1 + "&tipo2=" + tipo2;
    console.log(url2);
    return this.http.get<any>(url2);
  }
  getCreatura(id:any){
    const url2 = this.urlCreatura+ "/retornar_creatura.php?id_creatura=" + id;
    //retornar_creatura.php?nombre_creatura=Blastoise&creador=SYSTEM
    return this.http.get<any>(url2);
  }
  getCreaturaConTipos( id: any){
    const url2 = this.urlCreatura+ "/retornar_creatura.php?id_creatura=" + id;
    //retornar_creatura.php?nombre_creatura=Blastoise&creador=SYSTEM
    return this.http.get<any>(url2);
  }
  listadoCreaturaConTipos(): Observable<any> {
    const url2 = this.urlCreatura+ "/listado.php";
     return this.http.get<any[]>(url2);
   }
   listadoCreaturaConTiposDeUsuario(usuario:any): Observable<any> {
    const url2 = this.urlCreatura + "/retornar_creatura_con_filtros.php?creador=" + usuario;
     return this.http.get<any[]>(url2);
   }
   eliminarCreatura(id:any){
    const url2 = this.urlCreatura+ "/baja.php";
    const body = '{"id_creatura":' + id +'}';
    return this.http.post<any>(url2,body);
   }
   getMoveset(id:any){
    const url2 = this.urlCreatura+ "/retornar_habilidades.php?id_creatura=" + id;
    return this.http.get<any>(url2);
   }

   getHabilidadesConTipos(){
    const url2 = this.urlHabilidades + "/getAll_habilidades.php";
    return this.http.get<any>(url2);
   }
   getHabilidadesPorTipo(tipo:any){
    const url2 = this.urlHabilidades + "/get_habilidades_tipos.php?id_tipo=" + tipo;
    console.log("Console log momento");
    console.log(tipo);

    return this.http.get<any>(url2);
   }
   buscar(buscar:any){
    const url2= this.urlBuscar + "/busqueda.php?buscar=" + buscar;
    //console.log("a ver que da el buscar");
    //console.log();
    return this.http.get<any>(url2);
   }
   getTipos(){
    return this.http.get<any[]>(this.urlTipos+ "/retornarAll_tipos.php");
   }


	get_Tipo_Con_Id(id:any){
		const url2 = this.urlTipos + "/retornar_tipo.php?id_tipo=" + id;
		return this.http.get(url2);
	}

	Alta_Habilidad(nueva_habilidad:any){
		return this.http.post(this.urlHabilidades + "/alta.php",nueva_habilidad);
	}
	
	Baja_Habilidad(id:any){
		const url2 = this.urlHabilidades + "/baja.php?id_habilidad=" + id;
		return this.http.delete(url2);
	}

  modificarHabilidad(id_habilidad: string, creador: string, data: any): Observable<any> {
    // Usamos PUT y enviamos id y creador como query params
    const params = new HttpParams()
      .set('id_habilidad', id_habilidad)
      .set('creador', creador);

    return this.http.put<any>(`${this.urlHabilidades}/modificacion.php`, data, { params });
  }

	Listar_Habilidades(){
		return this.http.get(this.urlHabilidades);
	}
	
	Listar_Habilidades_Creadas_Por(creador:any){	
		return this.http.get<any>(this.urlHabilidades + `/retornar_habilidades_creador.php?creador=${creador}`);
	}

  getHabilidad(id:any){
    const url2 = this.urlHabilidades + "/retornar_habilidad.php?id_habilidad=" + id;
    return this.http.get<any>(url2);
  }

	Listar_Habilidades_Por_Tipo(id:any){	
		const url2 = this.urlHabilidades + "/tipo/" + id;
		return this.http.get(url2);
	}

  listarUsuarios(){
    const url2 = this.urlUsuario + "/listarAll_usuarios.php";
    return this.http.get<any[]>(url2);
  }

  Mostar_Tipo(id:any){
  	const url2 = this.urlCreatura +"/retornar_calculo_defensivo.php?tipo1=" + id;
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
		const url2 = this.urlImagenes + nombre;
		return this.http.get(url2 , {headers: this.header_para_get_imagenes, responseType: 'blob'});
	}
	
	Alta_Tipo(nuevo_tipo:any): Observable<any>{
		const url2 = this.urlTipos+"/alta.php";
		return this.http.post(url2, nuevo_tipo);
	}

	get_Tipos_Creados_Por(nombre:string){
		const url2 = this.urlTipos +"/retornar_tipos_usuario.php?creador="+nombre;
		return this.http.get<any>(url2);
	}
}
