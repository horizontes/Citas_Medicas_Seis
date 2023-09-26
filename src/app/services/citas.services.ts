import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../citas.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private basUrl = "http://localhost:8080/api/citas"

  constructor(private httpClient: HttpClient) {
  }

  getCitasList(): Observable<Cita[]> {
    return this.httpClient.get<Cita[]>(`${this.basUrl}`);
  }

  createCitas(cita: Cita): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}`, cita);
  }

  getCitasById(id: number): Observable<Cita>{
    return this.httpClient.get<Cita>(`${this.basUrl}/${id}`);
  }

  updateCitas(id:number, cita:Cita): Observable<Object>{
    return this.httpClient.put(`${this.basUrl}/${id}`, cita);
  }

  deleteCitas(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.basUrl}/${id}`);
  }
} 