import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Cita } from 'src/app/models/citas.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CitasService } from 'src/app/services/citas.services';
import { DataService } from 'src/app/services/data.service';
import { SesionComponent } from 'src/app/services/login/sesion.component';
import { UsuariosService } from 'src/app/services/usuario.services';

import {BehaviorSubject, Observable} from 'rxjs';

import Especialidades from '../../../assets/data/especialidades.json';
import Medicos from '../../../assets/data/medicos.json';
import Sedes from '../../../assets/data/sedes.json';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

const citasView: CitaView[] = [];

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  user: Usuario = SesionComponent.user;
  citas: Cita[] = [];
  error: string = this.citas.length == 0 ? "Todavia no tienes citas programadas." : "";
  es: Especialidad[] = Especialidades;
  md: Medico[] = Medicos;
  sd: Sede[] = Sedes;

  dataSource: MatTableDataSource<CitaView>;
  selection = new SelectionModel<CitaView>(true, []);

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private dataService: DataService, 
    private usuarioService: UsuariosService, private citasService: CitasService){

      this.dataSource = new MatTableDataSource<CitaView>(citasView);

      this.matIconRegistry.addSvgIcon(
        'calendar_add_on',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/svg/calendar_add_on.svg')
    );

    this.dataService.data$.subscribe(data => {
      this.user = data;
    });

    var id = localStorage.getItem('usuarioId');
    if (id) {
      this.usuarioService.getUsuariosById(+id).subscribe(d=> {
        this.user = d;
        this.citasService.getCitasById(this.user.usuarioId).subscribe(
          c => {
            
            this.citas = c;

            citasView.length = 0;

            if (this.citas.length != 0){
              this.error = "";
            } else {
              this.error = "Todavia no tienes citas programadas.";
            }

            this.citas.forEach(c => {
      
              var m = this.md.filter(m => c.medicoId == m.medicoId)[0];
              var s = this.sd.filter(s => s.id == (c.sede && c.sede != 0 ? c.sede : m.sede))[0];
              
              citasView.push(
                {
                pacienteId: c.pacienteId,
                nombre: this.user.nombres + " " + this.user.apellidos,
                fecha: c.fecha,
                hora: c.hora,
                lugar: s.name + " - " + s.address,
                medico: m.name,
                direccion: s.address.replaceAll(' ', '+').replaceAll('.',''),
                citaId: c.citaId
              });

              this.dataSource = new MatTableDataSource<CitaView>(citasView);

              this.error = "";
        
            });

          }
        );
      });
    }

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: CitaView): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pacienteId ? row.pacienteId+ 1 : 1}`;
  }

  eliminarCita(){
    console.log('eliminarCita');

    if (this.selection.selected.length == 0){
      alert("Seleciona una cita para cancelar");
    }

    this.selection.selected.forEach(c => { 
      this.citasService.deleteCitas(c.citaId).subscribe(d => {
        this.dataSource = new MatTableDataSource<CitaView>(citasView);
        window.location.reload();
      });
    });
  }

}

type CitaView = {

  pacienteId: number | null;
  nombre: string| null;
  fecha: string| null;
  hora: string| null;
  lugar: string| null;
  medico: string| null;
  direccion: string|null;
  citaId: number;

}

interface Medico {

  name: string;
  medicoId: number;
  especialidadId: number;
  sedeId: number[];
  colaPacientes: number;
  horasLibres: number[];
  citas: Cita[];
  sede: number;

}

interface Sede{

  name: string;
  id: number;
  district: string;
  address: string;
  reference: string;

}

interface Especialidad {
  name: string;
  id: number;
}
