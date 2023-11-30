import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private basUrl = "http://localhost:8080/api/medicos";

  constructor(private httpClient: HttpClient) {
  }

  getItemList(): Observable<Medico[]> {
    return this.httpClient.get<Medico[]>(`${this.basUrl}`);
  }

  getMedicosList(d: string|null, espId: Number, sedId: Number): Observable<Medico[]> {
    return this.httpClient.get<Medico[]>(`${this.basUrl}/especialidad?fecha=${d}&especialidadId=${espId}&sedeId=${sedId}`);
  }

  createItem(m: Medico): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}`, m);
  }

  getItemById(id: number): Observable<Medico>{
    return this.httpClient.get<Medico>(`${this.basUrl}/${id}`);
  }

  updateItem(id:number, m:Medico): Observable<Object>{
    return this.httpClient.put(`${this.basUrl}/${id}`, m);
  }


} 