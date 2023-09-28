import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './screens/home/home.component';
import { MisCitasComponent } from './screens/mis-citas/mis-citas.component';
import { NuevaCitaComponent } from './screens/nueva-cita/nueva-cita.component';
import { EmergenciaComponent } from './screens/emergencia/emergencia.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { EspecialidadComponent } from './screens/especialidad/especialidad.component';
import { MedicosEspecialidadComponent } from './screens/medico/medicos-especialidad.component';
import { CrearCitaComponent } from './screens/cita/crear-cita.component';
import { SesionComponent } from './services/login/sesion.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'nueva-cita',
    component: NuevaCitaComponent,
  },
  {
    path: 'emergencia',
    component: EmergenciaComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'mis-citas',
    component: MisCitasComponent,
  },
  {
    path: 'especialidad',
    component: EspecialidadComponent,
  },
  {
    path: 'medicosEspecialidad',
    component: MedicosEspecialidadComponent,
  },
  {
    path: 'crear-cita',
    component: CrearCitaComponent,
  },
  {
    path: 'Login',
    component: SesionComponent,
  },
  // redirect to `home` if there is no path
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
