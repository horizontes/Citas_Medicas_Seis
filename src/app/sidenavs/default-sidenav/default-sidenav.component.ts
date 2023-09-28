import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { DataService } from 'src/app/services/data.service';
import { SesionComponent } from 'src/app/services/login/sesion.component';

@Component({
  template: ` <h1>Clinica San Pablo</h1>

    <app-sidenav-link routerLink="/home">
      <mat-icon icon>home_outline</mat-icon>

      Inicio
    </app-sidenav-link>

    <app-sidenav-link routerLink="nueva-cita">
      <mat-icon icon>add_circle_outline</mat-icon>

      Nueva Cita
    </app-sidenav-link>

    <app-sidenav-link routerLink="/emergencia">
      <mat-icon icon>error_outline</mat-icon>

      Emergencia
    </app-sidenav-link>

    <app-sidenav-link routerLink="/settings">
      <mat-icon icon>settings</mat-icon>

      Settings
    </app-sidenav-link>
    
    <p>&nbsp;</p>
    <div (click)="cerrarSesion()" routerLink="/Login">
    <app-sidenav-link>
      <mat-icon icon> exit_to_app </mat-icon>

      Cerrar session
    </app-sidenav-link>
    </div>    
    `,
  styles: [``],
})
export class DefaultSidenavComponent {

  constructor(private dataService: DataService){
    dataService.sendData(SesionComponent.user);
  }

  cerrarSesion(){
    localStorage.clear();

    setTimeout(function(){
    window.location.reload();
    }, 300);
  }

}
