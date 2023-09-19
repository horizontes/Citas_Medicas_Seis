import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SidenavLinkComponent } from './components/sidenav-link/sidenav-link.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './screens/home/home.component';
import { MisCitasComponent } from './screens/mis-citas/mis-citas.component';
import { NuevaCitaComponent } from './screens/nueva-cita/nueva-cita.component';
import { EmergenciaComponent } from './screens/emergencia/emergencia.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { DefaultSidenavComponent } from './sidenavs/default-sidenav/default-sidenav.component';
import { SettingsSidenavComponent } from './sidenavs/settings-sidenav/settings-sidenav.component';

import { SidenavContentAreaDirective } from './components/sidenav/sidenav-content-area.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SidenavLinkComponent,
    SidenavComponent,
    HomeComponent,
    MisCitasComponent,
    NuevaCitaComponent,
    SettingsComponent,
    EmergenciaComponent,
    SidenavContentAreaDirective,

    DefaultSidenavComponent,
    SettingsSidenavComponent,
  ],
  imports: [BrowserModule, RouterModule, AppRoutingModule, MatIconModule, MatToolbarModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}