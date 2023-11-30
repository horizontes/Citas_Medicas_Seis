import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../models/citas.model';
import { Usuario } from '../models/usuario.model';
import { SesionComponent } from './login/sesion.component';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private basUrl = "http://localhost:8080/api/usuarios";

  private cache$: Usuario = SesionComponent.user;

  constructor(private httpClient: HttpClient) {
  }

  getUsuariosList(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.basUrl}`);
  }

  getValidarUsuario(c: string, p : string): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`http://localhost:8080/api/usuarios/validarUsuario`, 
    {
      'correo': c, 'clave': p
    });
  }

  createUsuarios(u: Usuario): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}`, u);
  }

  getUsuariosById(id: number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.basUrl}/${id}`);
  }

  updateUsuarios(id:number, cita:Usuario): Observable<Object>{
    return this.httpClient.put(`${this.basUrl}/${id}`, Usuario);
  }

  deleteUsuarios(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.basUrl}/${id}`);
  }
} 