import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new Subject<Usuario>();
  data$ = this.dataSource.asObservable();

  sendData(data: Usuario) {
    this.dataSource.next(data);

  }
}