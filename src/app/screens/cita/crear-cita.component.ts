import { Component, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, NgIf, AsyncPipe, NgStyle, DatePipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

//import data
import Especialidades from '../../../assets/data/especialidades.json';
import Medicos from '../../../assets/data/medicos.json';
import Sedes from '../../../assets/data/sedes.json';
import Citas from '../../../assets/data/citas.json';
import * as _moment from 'moment';

@Component({
  selector: 'crearCita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.scss'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}, },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_LOCALE, useValue: 'es-US' },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
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
    NgStyle,
    AsyncPipe,
    MatCardModule,
    MatRippleModule,
    MatStepperModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
  ],
})

export class CrearCitaComponent implements OnInit{

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  datePipe: DatePipe = new DatePipe("en-US");
  datePipeEs: DatePipe = new DatePipe("es-US");

  disabledFirstNext : boolean = true;
  disabledSecondNext : boolean = true;
  disabledThirdNext : boolean = true;

  dias = [['Monday', 'Lunes'], ['Tuesday', 'Martes'], ['Wednesday', 'Miércoles'], ['Thursday', 'Jueves'],
    ['Friday', 'Viernes'], ['Saturday', 'Sábado'], ['Sunday', 'Domingo']];

  meses = [['Enero','January'], ['Febrero','February'], ['Marzo','March'], 
  ['Abril','April'], ['Mayo','May'], ['Junio','June'], ['Julio','July'], 
  ['Agosto','August'], ['Septiembre','September'], ['Octubre','October'], 
  ['Noviembre','November'], ['Diciembre','December']];

  date2 = new FormControl(_moment());

  fechaSelected: Date = new Date;
  fechaStringSelected: string | null = "";

  horaSelected: number = 0;

  especialidades: Especialidad[] = Especialidades;
  especialidadSelected : Especialidad = { name:"", id:0 };

  medicos: Medico[] = Medicos;
  optionsMedicos: Array<Medico[]> = [];
  medicoSelected : Medico = { name:"", medicoId:0, especialidadId:0, sedeId: [], colaPacientes: 0, 
    citas:[], horasLibres:[] };

  sedes: Sede[] = Sedes;
  sedeSelected: Sede = { name: "", id: 0,  district: "", address: "", reference: "" };
  
  citas: Citas[] = Citas;

  constructor(private _formBuilder: FormBuilder, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private route: ActivatedRoute, private dateAdapter: DateAdapter<Date>){

      this.dateAdapter.setLocale('es-US');

      this.route.queryParams
      .subscribe(params => {
        
        if (params['especialidadId'] != null){

          if (this.especialidades.filter( o => o.id == params['especialidadId']) != null) {
            this.especialidadSelected = this.especialidades.filter( o => o.id == params['especialidadId'])[0];
          }
          
        }

        if (this.especialidadSelected.id != 0){

          this.medicos = this.medicos.filter(m => m.especialidadId == this.especialidadSelected.id);
          this.optionsMedicos = this.converTwoDimensions(this.optionsMedicos, this.medicos);
          
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

  ngOnInit() {
  }

  obtenerSede(e: any){

    const id: number = e.value;

    if (this.sedes.filter( s => s.id == id)[0] != null){

      this.sedeSelected = this.sedes.filter( s => s.id == id)[0];
      
      this.optionsMedicos = this.converTwoDimensions(this.optionsMedicos, 
                            this.medicos.filter(m => m.sedeId.includes(this.sedeSelected.id)));

    } else {

      this.sedeSelected = { name: "", id: 0,  district: "", address: "", reference: "" };

    }
    
  }

  obtenerFecha(e: any){

    if (e.value != null) {

      this.date2 = new FormControl(_moment(e.value));
      this.fechaStringSelected = this.transformDate(e.value);
      this.obtenerCitas(this.fechaStringSelected);
      console.log(this.date2.value?.toDate());

    }
    
  }

  obtenerCitas(f: string | null){

    if (this.medicos != null){
      for (let i = 0; i < this.medicos.length; i++) {
        if (this.medicos[i] != null){
          const m = this.medicos[i];
          m.colaPacientes = 0;
          for (let i = 0; i < this.citas.length; i++) {
            const c = this.citas[i];
            if (m.citas == null) {
              m.citas = [];
            }
            if (c.medicoId == m.medicoId && this.fechaStringSelected == c.fecha){
              m.citas.push(c);
              m.colaPacientes = +c.duracion;
            }
          }
          this.medicos[i] = m;
        }        
      }
    }
  }

  obtenerMedico(e: any){

    if (e.value != null) {
      this.medicoSelected = e.value;
      this.disabledFirstNext = false;
      this.obtenerHorasLibres(this.medicoSelected);
    }

  }

  obtenerHorasLibres(m : Medico){

    if (m != null){
      const hf: number[] = [];
      m.citas.map(c => {
        if (c.duracion == 1){
            hf.push(Number(c.hora.split(':')[0]));
          } else if (c.duracion > 1){
            for (let i = 0; i < c.duracion; i++) {
              hf.push(Number(c.hora.split(':')[0]) + i);
            }
          }
      });

      m.horasLibres = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18].filter(
        x => !hf.includes(x));

      console.log(m.horasLibres);

    }

  }

  obtenerFullDate(){
    if (this.fechaSelected != null && this.date2.value != null){
      return this.traducirFecha(
        this.datePipe.transform(this.date2.value.toDate(), 'EEEE|, dd *e |MMMM| *el YYYY'));
    }
    return "";
  }

  traducirFecha(s: string | null){
    var a = s ? s.split('|'): [];
    var d, m = "";

    this.dias.forEach(x => { if (x[0] == a[0]){ d = x[1]; } });
    
    this.meses.forEach(x => { if (x[1] == a[2]){ m = x[0]; } });

    return (d + a[1] + m + a[3]).replaceAll('*', 'd');
  }

  obtenerHora(e: any){

    this.horaSelected = e.value;

  }

  private converTwoDimensions(optionsFiltered: Array <any[]>, options: any[]){

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

  private transformDate(d : Date){

    return this.datePipe.transform(d, "dd/MM/yyyy");

  }

}

interface Medico {

  name: string;
  medicoId: number;
  especialidadId: number;
  sedeId: number[];
  colaPacientes: number;
  horasLibres: number[];
  citas: Citas[];

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

interface Citas{

  medicoId: number;
  pacienteId: number;
  fecha: string;
  hora: string;
  duracion: number;
  total: number;

}

