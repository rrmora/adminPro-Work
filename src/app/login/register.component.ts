import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuarios.model';
import { Router } from '@angular/router';
import { NotificacionesService } from '../services/notificaciones/notificaciones.service';

declare function init_plugin();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  usuarios = [];
  isduplicated = false;
  constructor(public usuarioService: UsuarioService, public router: Router, private toastrService: NotificacionesService) { }

  validarCampos(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      } else {
        return {
          validarCampos: true
        };
      }
    };
  }
  ngOnInit() {
    init_plugin();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
      isEmailDuplicated: new FormControl(false)
    }, {validators: this.validarCampos('password', 'password2')});

    this.forma.setValue({
      nombre: '',
      email: '',
      password: '',
      password2: '',
      condiciones: false,
      isEmailDuplicated: false
    });

    this.usuarioService.cargarUsuarios().subscribe((res: any ) => {
      this.usuarios = res.usuarios;
      console.log('Usuarios', this.usuarios);
    });

  }

  eventChange(email: any) {
    console.log('Value', email);
    let userduplicate = this.usuarios.find(x => x.email === email);
    if (userduplicate) {
      this.forma.value.isEmailDuplicated = true;
      this.toastrService.ErrorNotification('Error', 'El correo ya se encuentra registrado');
    } else {
      this.forma.value.isEmailDuplicated = false;
    }

  }

  registrarUsuario() {
    if (!this.forma.value.condiciones) {
      this.toastrService.WarningNotification('Advertencia', 'Debe seleccionar terminos y condiciones.');
    }
    
    this.eventChange(this.forma.value.email);

    if (this.forma.valid && !this.forma.value.isEmailDuplicated) {
      let usuario = new Usuario(
        this.forma.value.nombre,
        this.forma.value.email,
        this.forma.value.password,
        'USER_ROLE'
      );
  
      this.usuarioService.crearUsuario(usuario).subscribe((result: Usuario) => {
        this.router.navigate(['/login']);
      });
    }
  }

}
