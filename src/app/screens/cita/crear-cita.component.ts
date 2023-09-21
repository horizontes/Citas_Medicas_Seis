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

//import data
import Especialidades from '../../../assets/data/especialidades.json';
import Medicos from '../../../assets/data/medicos.json';
import Sedes from '../../../assets/data/sedes.json';
import Citas from '../../../assets/data/citas.json';

@Component({
  selector: 'crearCita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
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
  ],
})

export class CrearCitaComponent implements OnInit{

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  fechaSelected: Date = new Date;
  fechaStringSelected: string | null = "";

  especialidadSelected : Especialidad = { name:"", id:0 };
  medicoSelected : Medico = { name:"", medicoId:0, especialidadId:0, sedeId: [], colaPacientes: 0 };
  sedeSelected: Sede = { name: "", id: 0,  district: "", address: "", reference: "" };

  especialidades: Especialidad[] = Especialidades;
  medicos: Medico[] = Medicos;
  optionsMedicos: Array<Medico[]> = [];
  sedes: Sede[] = Sedes;
  citas: Citas[] = Citas;

  constructor(private _formBuilder: FormBuilder, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private route: ActivatedRoute){

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

          this.citas.forEach(c => {
            if (this.medicos.filter(m => m.medicoId == c.medicoId)[0] != null) {
              this.medicos.filter(m => m.medicoId == c.medicoId)[0].colaPacientes = c.duracion;
            }
          });
          
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

    let datePipe: DatePipe = new DatePipe("en-US");

    if (datePipe.transform(e.value as Date, "dd/MM/yyyy") != null) {
      this.fechaStringSelected = datePipe.transform(e.value as Date, "dd/MM/yyyy");
    }
    
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

}

interface Medico {

  name: string;
  medicoId: number;
  especialidadId: number;
  sedeId: number[];
  colaPacientes: number;

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

}

