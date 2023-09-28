import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { SidenavService } from './components/sidenav/sidenav.service';

import { DefaultSidenavComponent } from './sidenavs/default-sidenav/default-sidenav.component';
import { SesionComponent } from './services/login/sesion.component';
import { Usuario } from './models/usuario.model';
import { DataService } from './services/data.service';
import { UsuariosService } from './services/usuario.services';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'app-citas-cuatro';
  constructor(
    public sidenavService: SidenavService,
    private cdr: ChangeDetectorRef,
    private dataService: DataService,
    private usuarioService: UsuariosService
  ) {

    this.dataService.data$.subscribe(data => {
      this.showMenu = data != null;
    });

    var id = localStorage.getItem('usuarioId');
    if (id) {
      usuarioService.getUsuariosById(+id).subscribe(d=> {
        this.user = d;
        this.showMenu = d != null;
      });
    }

  }

  @Input("user")
  user: Usuario = SesionComponent.user;

  showMenu: boolean = false;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
      this.sidenavService.push(DefaultSidenavComponent);
      this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.sidenavService.pop();
  }
}

