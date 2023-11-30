import { Component, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf, AsyncPipe, NgStyle, DatePipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

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
import Medicos from '../../../assets/data/medicos.json';
import Sedes from '../../../assets/data/sedes.json';

import * as _moment from 'moment';
import { Cita } from 'src/app/models/citas.model';
import { CitasService } from 'src/app/services/citas.services';
import { DataService } from 'src/app/services/data.service';
import { SesionComponent } from 'src/app/services/login/sesion.component';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuario.services';
//import { Medico } from 'src/app/models/medico.model';
import { Especialidad } from 'src/app/models/especialidad.model';
import { EspecialidadService } from 'src/app/services/especialidad.services';
import { Sede } from 'src/app/models/sede.model';
import { MedicoService } from 'src/app/services/medico.services';
import { Medico } from 'src/app/models/medico.model';


@Component({
  selector: 'crearCita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.scss'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true} },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_LOCALE, useValue: 'es-US' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
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
  horaStringSelected: string = '';

  //especialidades: Especialidad[] = Especialidades;
  especialidadSelected : Especialidad = { nombre: "", especialidadId: 0 };

  medicos: Medico[] = Medicos;
  optionsMedicos: Array<Medico[]> = [];
  medicoSelected : MedicoView = { name:"", medicoId:0, especialidadId:0, sedeId: [], colaPacientes: 0, 
    citas:[], horasLibres:[] };

  sedes: Sede[] = [];
  sedeSelected: Sede = { nombre: "", sedeId: 0,  distrito: "", direccion: "", referencia: "" };

  citas: Cita[] = [];

  user: Usuario = SesionComponent.user;

  constructor(private _formBuilder: FormBuilder, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private route: ActivatedRoute, 
    private dateAdapter: DateAdapter<Date>, private service: CitasService, 
    private dataService: DataService, private usuarioService: UsuariosService,
    private especialidadesService: EspecialidadService,
    private medicoService: MedicoService){

      this.dateAdapter.setLocale('es-US');
      
      this.dataService.data$.subscribe(data => {
        this.user = data;
      });

      var id = localStorage.getItem('usuarioId');
      if (id) {
        this.usuarioService.getUsuariosById(+id).subscribe(d=> {
          this.user = d;
        });
      }
      /**
      service.getCitasList().subscribe(data => {
        this.citas = data;
      }); */

      this.route.queryParams
      .subscribe(params => {
        
        if (params['especialidadId'] != null){

          this.especialidadesService.getItemById(params['especialidadId'])
          .subscribe(d => {
            this.especialidadSelected = d;
            this.sedes = this.especialidadSelected.sedes? this.especialidadSelected.sedes : [];
          })
         
        }
        /** 
        if (this.especialidadSelected.especialidadId != 0){

          this.medicos = this.medicos.filter(m => m.especialidadId == this.especialidadSelected.especialidadId);
          this.optionsMedicos = this.converTwoDimensions(this.optionsMedicos, this.medicos);
          
        }**/

        if (params['medicoId'] != null){

          this.medicos = this.medicos.filter(m => m.medicoId == params['medicoId']);
          this.optionsMedicos = this.converTwoDimensions(this.optionsMedicos, this.medicos);

        }
        
      }
      
    );

      this.matIconRegistry.addSvgIcon(
        'calendar_add_on',
        this.domSanitizer
          .bypassSecurityTrustResourceUrl('../../../assets/svg/calendar_add_on.svg')
      );

      this.matIconRegistry.addSvgIcon(
        'user-med',
        this.domSanitizer
          .bypassSecurityTrustResourceUrl('../../../assets/svg/user-md.svg')
      );

      this.matIconRegistry.addSvgIcon(
        'serv-med',
        this.domSanitizer
          .bypassSecurityTrustResourceUrl('../../../assets/svg/serv-med.svg')
      );

      this.matIconRegistry.addSvgIcon(
        'plus-circle',
        this.domSanitizer
          .bypassSecurityTrustResourceUrl('../../../assets/svg/plus-circle.svg')
      );

  }

  myControl = new FormControl('');  

  ngOnInit() {
  }

  obtenerSede(e: any){

    const id: number = e.value;

    if (this.sedes.filter( s => s.sedeId == id)[0] != null){

      this.sedeSelected = this.sedes.filter( s => s.sedeId == id)[0];
      /** 
      this.optionsMedicos = this.converTwoDimensions(this.optionsMedicos, 
                            this.medicos.filter(
                              m => m.sedeId.includes(this.sedeSelected.sedeId)));
*/
    } else {

      this.sedeSelected = { nombre: "", sedeId: 0,  distrito: "", direccion: "", referencia: "" };

    }
    
  }

  obtenerFecha(e: any){

    if (e.value != null) {

      this.date2 = new FormControl(_moment(e.value));
      this.fechaStringSelected = this.transformDate(e.value);

      this.medicoService.getMedicosList(this.transformDateSQL(e.value), 
        this.especialidadSelected.especialidadId, this.sedeSelected.sedeId)
        .subscribe(d => {
          this.medicos = d;
          this.optionsMedicos = this.converTwoDimensions(this.optionsMedicos, 
            this.medicos);
        })
      
      /**this.optionsMedicos = this.converTwoDimensions(this.optionsMedicos, 
            this.medicos.filter(
            m => m.sedeId.includes(this.sedeSelected.sedeId)));**/

      console.log(this.medicos);

    }
    
  }

  obtenerMedico(e: any){

    if (e.value != null) {
      this.medicoSelected = e.value;
      this.disabledFirstNext = false;
      this.obtenerHorasLibres(this.medicoSelected);
    }

  }

  obtenerHorasLibres(m : MedicoView){

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

      m.horasLibres = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        .filter(x => !hf.includes(x));

      console.log(m.horasLibres);

    }

  }

  obtenerFullDate(){
    if (this.fechaSelected != null && this.date2.value != null){

      return this.traducirFecha(
        this.datePipe.transform(this.date2.value.toDate(), 
        'EEEE|, dd *e |MMMM| *el YYYY'));

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

    this.horaStringSelected = e.value;

  }

  agregarCita(){
    var s = new Sede;
    s.sedeId = this.sedeSelected.sedeId
    const c: Cita = 
    { 
      medico: this.viewToMedico(this.medicoSelected),
      usuario: this.user,
      fecha: this.stringToDate(this.fechaStringSelected),
      especialidad: this.especialidadSelected,
      hora: this.horaStringSelected,
      duracion: 1,
      sede: this.sedeSelected,
      citaId: 0
    };

    this.service.createCitas(c).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      }
    });

  
    this.medicoSelected = { name:"", medicoId:0, especialidadId:0, sedeId: [], colaPacientes: 0, 
    citas:[], horasLibres:[] };
 
    this.especialidadSelected = { nombre:"", especialidadId:0 };
 
    this.sedeSelected = { nombre: "", sedeId: 0,  distrito: "", direccion: "", referencia: "" };

    this.horaSelected = 0;
    this.horaStringSelected = '';

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

  private transformDateSQL(d : Date){
    return this.datePipe.transform(d, "yyyy-MM-dd");
  }

  private stringToDate(s: string | null){
    var ss = s ? s.split("/") : "";
    return new Date(ss[2] + "-" + ss[1] + "-" + ss[0]);
  }

  private viewToMedico(mv: MedicoView){
      var m = new Medico;
      m.medicoId = mv.medicoId;
      m.nombreCompleto = mv.name;
      m.correo = "";
      m.clave = "";
      return m;
  }

}

interface MedicoView {

  name: string;
  medicoId: number;
  especialidadId: number;
  sedeId: number[];
  colaPacientes: number;
  horasLibres: number[];
  citas: Cita[];

}




