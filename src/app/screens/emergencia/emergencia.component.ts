import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario.model';
import { SesionComponent } from 'src/app/services/login/sesion.component';
import { UsuariosService } from 'src/app/services/usuario.services';

@Component({
  templateUrl: "./emergencia.component.html",
  styleUrls: ["./emergencia.component.scss"]
})
export class EmergenciaComponent {

  user: Usuario = SesionComponent.user;

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private usuarioService: UsuariosService){
    var id = localStorage.getItem('usuarioId');
      if (id) {
        this.usuarioService.getUsuariosById(+id).subscribe(d=> {
          this.user = d;
        });
      }

      this.matIconRegistry.addSvgIcon(
        'whatsapp-icon',
        this.domSanitizer
          .bypassSecurityTrustResourceUrl('../../../assets/svg/whatsapp-icon.svg')
      );
  }

}
