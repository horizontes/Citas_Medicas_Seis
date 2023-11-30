import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors, } from '@angular/forms';
import {NgIf} from '@angular/common';
import { UsuariosService } from '../usuario.services';
import { Usuario } from 'src/app/models/usuario.model';
import { DataService } from '../data.service';

/** @title Form field appearance variants */
@Component({
  selector: 'sesion-component',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss'],

  standalone: true,
  imports: [ RouterModule, MatFormFieldModule, MatInputModule, MatIconModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf,
    MatCheckboxModule,
   ],
})
export class SesionComponent {

  public static user: Usuario;

  constructor(private service: UsuariosService, private router: Router,
    private dataService: DataService ){

      var id = localStorage.getItem('usuarioId');
      if (id) {
        this.service.getUsuariosById(+id).subscribe(d=> {
          if (d){
            this.router.navigate(['/home']);
          }
        });
      }

  }

  hide: boolean = true;

  checked: boolean = false;

  error: string = "";

  emailFormControl = new FormControl('', [Validators.required, Validators.email, ]);

  claveFormControl = new FormControl('');

  validarLogin(e: any){

    if (!this.emailFormControl.value || !this.claveFormControl.value){
      this.error = "Complete los campos requeridos";
      return
    }

    this.service.getValidarUsuario(this.emailFormControl.value ? this.emailFormControl.value : '', 
    this.claveFormControl.value ? this.claveFormControl.value : '')
      .subscribe(d => {
        console.log(d);
        if (d != null){
          if (d.estado && d.estado == 4){
            this.error = "El usuario se encuentra bloqueado, por favor informe a soporte técnico.";
          } else {
            this.dataService.sendData(d);
            this.error="";
            this.router.navigate(['/home']);
            localStorage.setItem('usuarioId', '' + d.usuarioId);
          }
        } else {
          this.error = "Usuario o clave no valido.";
        }
      
    });
    
  }
  
}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value ? 
    { confirmPassword: true } : { confirmPassword: false };
};