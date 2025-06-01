import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

  export class UsuariosServiceService {
    private apiUrl = 'http://localhost:3000/usuarios';
  
    constructor(private http: HttpClient) {}
  
    registrarUsuario(datos: any): Observable<any> {
      return this.http.post(this.apiUrl, datos);
    }
  }
  
