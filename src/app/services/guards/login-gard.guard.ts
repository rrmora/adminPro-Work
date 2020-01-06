import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGardGuard implements CanActivate {
  constructor(public usuarioServices: UsuarioService, public router: Router) {}

  canActivate() {
    if (this.usuarioServices.isLogged()) {
      console.log('Paso por el gard');
      return true;
    } else {
      console.log('Bloquedo por el gard');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
