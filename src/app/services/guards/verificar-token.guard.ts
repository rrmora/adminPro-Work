import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class VerificarTokenGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService, private router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    let token = this.usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expirado = this.expirado(payload.exp);
    if (expirado) {
      this.router.navigate(['/login']);
      return false;
      // localStorage.clear();
      // sessionStorage.clear();
      // return true;
    }
    
    return this.renovarToken(payload.exp);
  }

  renovarToken(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();
      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renovarToken().subscribe(res => {
          resolve(true);
        }, () => {
          this.router.navigate(['/login']);
          reject(false);
        })
      }
    })
  }
  

  expirado(fechaExp: number) {
      let ahora = new Date().getTime() / 1000;
      if (fechaExp < ahora) {
        return true;
      } else {
        return false;
      }
  }
}
