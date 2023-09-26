import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { SidenavService } from './components/sidenav/sidenav.service';

import { DefaultSidenavComponent } from './sidenavs/default-sidenav/default-sidenav.component';

import citasjson from '../assets/data/citas.json';
import { Cita } from './citas.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'app-citas-cuatro';
  constructor(
    public sidenavService: SidenavService,
    private cdr: ChangeDetectorRef
  ) {



  }

  public static citas: Cita[] = citasjson;

  ngAfterViewInit(): void {
    this.sidenavService.push(DefaultSidenavComponent);
    this.cdr.detectChanges();

    

  }

  ngOnDestroy(): void {
    this.sidenavService.pop();
  }
}

