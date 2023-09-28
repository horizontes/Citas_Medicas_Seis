import { Component, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
//Import data
import Especialidades from '../../../assets/data/especialidades.json';
import Medicos from '../../../assets/data/medicos.json';
import { SesionComponent } from 'src/app/services/login/sesion.component';
import { Usuario } from 'src/app/models/usuario.model';
import { DataService } from 'src/app/services/data.service';
import { UsuariosService } from 'src/app/services/usuario.services';

@Component({
  selector: 'medico',
  templateUrl: './medicos-especialidad.component.html',
  styleUrls: ['./medicos-especialidad.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    AsyncPipe,
    MatCardModule,
    MatRippleModule,
  ],
})

export class MedicosEspecialidadComponent implements OnInit{

  especialidadSelected: Especialidad = { name:"", id:0 };

  especialidad: Especialidad[] = Especialidades;
  options: Medico[] = Medicos;

  user: Usuario = SesionComponent.user;

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private route: ActivatedRoute, 
    private usuarioService: UsuariosService){

    var id = localStorage.getItem('usuarioId');
    if (id) {
      this.usuarioService.getUsuariosById(+id).subscribe(d=> {
        this.user = d;
      });
    }

      this.route.queryParams.subscribe(params => {
        
        if (params['especialidadId'] != null){

          if (this.especialidad.filter( o => o.id == params['especialidadId']) != null) {
            this.especialidadSelected = this.especialidad.filter( o => o.id == params['especialidadId'])[0];
          }
          
        }

        for (let i = 0; i < this.options.length; i++) {
          const m = this.options[i];
          m.especialidad = this.especialidad.filter( e => e.id == m.especialidadId)[0].name;
          m.nombreEspecilidad = m.name + " - " + m.especialidad;
          this.options[i] = m;
          
        }

        if (this.especialidadSelected.id != 0) {
          this.options = this.options.filter( m => m.especialidadId == this.especialidadSelected.id);
        }
        
      }
      
    );

      this.matIconRegistry.addSvgIcon(
        'calendar_add_on',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/svg/calendar_add_on.svg')
      );

      this.matIconRegistry.addSvgIcon(
        'user-med',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/svg/user-md.svg')
      );

      this.matIconRegistry.addSvgIcon(
        'serv-med',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/svg/serv-med.svg')
      );

      this.matIconRegistry.addSvgIcon(
        'plus-circle',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/svg/plus-circle.svg')
      );

  }

  myControl = new FormControl('');

  filteredOptions: Observable<string[]> = new Observable;
  optionsFiltered: Array<any> = [];
  

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.optionsFiltered = this.converTwoDimensions(this.optionsFiltered, this.options);

  }

  private converTwoDimensions(optionsFiltered: Array <Medico[]>, options: Medico[]){

    optionsFiltered = [];

    options.forEach((option, index) => {
      if(index % 3 == 0) {
          let row = [];
          row.push(option);
          optionsFiltered.push(row);
        } else {
          optionsFiltered[optionsFiltered.length - 1].push(option);
      }
    });

    return optionsFiltered;

  }

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();

    this.optionsFiltered = this.converTwoDimensions(this.optionsFiltered, 
      this.options.filter(option => option.nombreEspecilidad.toLowerCase().includes(filterValue)));
      
    return this.options.filter(option => option.nombreEspecilidad.toLowerCase().includes(filterValue))
      .map(o => o.nombreEspecilidad);

  }

}

interface Medico {

  name: string;
  nombreEspecilidad: string;
  medicoId: number;
  especialidadId: number;
  especialidad: string;
  sedeId: number[];

}

interface Especialidad {
  name: string;
  id: number;
};

