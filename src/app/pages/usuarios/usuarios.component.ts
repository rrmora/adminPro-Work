import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuarioService } from '../../services/service.index';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  faTrash = faTrash; faSave = faSave;
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }
cargarUsuarios() {
  this.cargando = true;
  this.usuarioService.cargarUsuarios(this.desde).subscribe((result: any) => {
    this.totalRegistros = result.totalUsuarios;
    this.usuarios = result.usuarios;
    this.cargando = false;
  });
}
cambiarDesde(valor: number) {
  let desde = this.desde + valor;
  if (desde >= this.totalRegistros) {
    return;
  }
  if (desde < 0) {
    return;
  }
  this.desde += valor;
  this.cargarUsuarios();
}
  buscarUsuario(search: string) {
    if (search.length > 0) {
      this.usuarioService.buscarUsuario(search).subscribe((result: Usuario[]) => {
        this.usuarios = result;
      });
    }
  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);
    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: 'Borrar usuario',
      text: '¿Está seguro de borrar a usuario ' + usuario.nombre + ' ?',
      icon: 'warning',
      reverseButtons: true,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'OK',
      // confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        'Cancelar',
      // cancelButtonAriaLabel: 'Thumbs down'
    }).then(result => {
      if (result.value) {
        this.usuarioService.borarUsuario(usuario._id).subscribe(result => {
          Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success');
          this.cargarUsuarios();
        });
      }
    });
  }

  actulizarRole(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
