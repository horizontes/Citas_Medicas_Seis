import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.scss'],
})
export class NuevaCitaComponent {

  location: Location;

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, location: Location){

      this.location = location;

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

  irAEspecialidad(){
    this.location.go('/especialidad');
    this.location.forward();
  }

}
