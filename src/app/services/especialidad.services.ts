import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private basUrl = "http://localhost:8080/api/especialidades";

  constructor(private httpClient: HttpClient) {
  }

  getItemList(): Observable<Especialidad[]> {
    return this.httpClient.get<Especialidad[]>(`${this.basUrl}`);
  }

  createItem(especialidad: Especialidad): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}`, especialidad);
  }

  getItemById(id: number): Observable<Especialidad>{
    return this.httpClient.get<Especialidad>(`${this.basUrl}/${id}`);
  }

  updateItem(id:number, cita:Especialidad): Observable<Object>{
    return this.httpClient.put(`${this.basUrl}/${id}`, cita);
  }


} 