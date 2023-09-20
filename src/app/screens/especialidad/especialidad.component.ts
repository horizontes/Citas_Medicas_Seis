import { Component, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, NgIf, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss'],
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
  ],
})
export class EspecialidadComponent implements OnInit{

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer){

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

  }

  myControl = new FormControl('');
  
  options: string[] = ['ANATOMIA', 'PATOLÓGICA','ANESTESIOLOGÍA','CARDIOLOGÍA','CIRUGÍA DE CABEZA, CUELLO Y MAXILOFACIAL','CIRUGÍA GENERAL',
  'CIRUGÍA ONCOLÓGICA','CIRUGÍA PEDIÁTRICA','CIRUGÍA PLÁSTICA','CIRUGÍA DE TÓRAX Y CARDIOVASCULAR','DERMATOLOGÍA',
  'ENDOCRINOLOGÍA','GASTROENTEROLOGÍA','GERIATRÍA','GINECOLOGÍA Y OBSTETRICIA','HEMATOLOGÍA','INMUNOLOGÍA Y ALERGIA',
  'MEDICINA OCUPACIONAL Y DEL MEDIO AMBIENTE','MEDICINA DE EMERGENCIAS Y DESASTRES','MEDICINA DE ENFERMEDADES INFECCIOSAS Y TROPICALES',
  'MEDICINA FAMILIAR Y COMUNITARIA','MEDICINA FISICA Y DE REHABILITACIÓN','MEDICINA INTENSIVA','MEDICINA INTERNA','MEDICINA NUCLEAR',
  'MEDICINA ONCOLÓGICA','NEFROLOGÍA','NEUMOLOGÍA','NEUROCIRUGÍA','NEUROLOGÍA','OFTALMOLOGÍA','ORTOPEDIA Y TRAUMATOLOGÍA','OTORRINOLARINGOLOGÍA','PATOLOGÍA CLINICA','PEDIATRÍA','PSIQUIATRÍA','RADIOLOGÍA','RADIOTERAPIA','REUMATOLOGÍA',
  'UROLOGÍA','ODONTOLOGÍA','CARDIOLOGÍA PEDIÁTRICA','ENDOCRINOLOGÍA PEDIÁTRICA','GASTROENTEROLOGÍA PEDIÁTRICA','GINECOLOGÍA ONCOLÓGICA',
  'MEDICINA INTENSIVA PEDIÁTRICA','NEFROLOGÍA PEDIÁTRICA','NEONATOLOGÍA','NEUMOLOGÍA PEDIÁTRICA','NEUROCIRUGÍA PEDIÁTRICA',
  'NEUROLOGÍA PEDIÁTRICA','ONCOLOGÍA PEDIÁTRICA','PSIQUIATRIA DE ADICCIONES','PSIQUIATRIA DEL NIÑO Y DEL ADOLESCENTE','UROLOGÍA PEDIÁTRICA'];
  
  filteredOptions: Observable<string[]> = new Observable;
  optionsFiltered: Array<any> = [];
  

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.optionsFiltered = this.converTwoDimensions(this.optionsFiltered, this.options);

  }

  private converTwoDimensions(optionsFiltered: Array <string[]>, options: string[]){

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
      this.options.filter(option => option.toLowerCase().includes(filterValue)));
      
    return this.options
    .filter(option => option.toLowerCase().includes(filterValue));
  }
}
