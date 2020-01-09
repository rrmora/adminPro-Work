import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuarios/usuario.service';
import { Usuario } from '../models/usuarios.model';

declare function init_plugin();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  // Google
  auth2: any;
  constructor(public _router: Router, public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugin();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '616298798167-grm8dhlh5up9tt6vnhgbiqi9104ndr2r.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSingIn(document.getElementById('btnGoogle'));
    });
  }

  attachSingIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token).subscribe(result => {
        this._router.navigate(['/dashboard']);
      });
    });
  }

  ingresar(forma: NgForm) {
    console.log(forma.valid);
    console.log(forma.value);
    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario(
      null, forma.value.email, forma.value.password, 'admin'
    );
    this.usuarioService.login(usuario, forma.value.recuerdame).subscribe(result => {
      this._router.navigate(['/dashboard']);
    });
  }
}
