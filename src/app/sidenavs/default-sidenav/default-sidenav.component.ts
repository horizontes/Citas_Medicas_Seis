import { Component } from '@angular/core';

@Component({
  template: ` <h1>Clinica San Pablo</h1>

    <app-sidenav-link routerLink="/home">
      <mat-icon icon>home_outline</mat-icon>

      Inicio
    </app-sidenav-link>

    <app-sidenav-link routerLink="/mis-citas">
      <mat-icon icon>calendar_today</mat-icon>

      Mis Citas
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
    </app-sidenav-link>`,
  styles: [``],
})
export class DefaultSidenavComponent {}
