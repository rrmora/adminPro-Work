import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuarios.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../archivo/subir-archivo.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
usuario: Usuario;
token: string;
  constructor(public http: HttpClient, public router: Router, 
              public subirArchivoService: SubirArchivoService,
              public toastrService: NotificacionesService
              ) {
    this.inicializarDeStorage();
   }

   renovarToken(){
    let url = URL_SERVICES + '/login/refreshtoken';
    url += '?token=' + this.token;
    return this.http.get(url).pipe(map((resp: any) => {
      this.token = resp.token;
      localStorage.setItem('token', this.token);
      return true;
    }), catchError ( error => {
      this.router.navigate(['/login']);
      this.toastrService.ErrorNotification('No se pudo renovar TOKEN', 'No fue posible renovar token')
      throw 'Error ' + error;
    }))
   }

   isLogged() {
    return (this.token.length > 5) ? true : false;
   }

   inicializarDeStorage(){
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
     } else {
       this.token = '';
       this.usuario = null;
     }
   }


  guardarLocalStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle(token: string) {
    let url = URL_SERVICES + '/login/google';
    return this.http.post(url, {token} ).pipe(map((result: any) =>{
      this.guardarLocalStorage(result.id, result.token, result.usuario);
      return true;
    })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICES + '/login';
    return this.http.post(url, usuario).pipe(
      map( (result: any) => {
        this.guardarLocalStorage(result.id, result.token, result.usuario);
        return true;
      }), catchError ( error => {
        this.toastrService.ErrorNotification('Error', error.error.mensaje)
        throw 'Error ' + error;
      }) 
    );
   }

   logOut() {
     this.token = '';
     this.usuario = null;
     localStorage.removeItem('token');
     localStorage.removeItem('usuarios');
     this.router.navigate(['/login']);
   }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICES + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((result: Usuario) => {
          Swal.fire('Usuario creado', result.email, 'success');
          return result;
        }), catchError ( error => {
          this.toastrService.ErrorNotification(error.error.mensaje, error.error.errors.message)
          throw 'Error ' + error;
        })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICES + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(map((result: any) => {
      if (usuario._id === this.usuario._id) {
        let userdb: Usuario = result.usuario;
        this.guardarLocalStorage(userdb._id, this.token, userdb);
      }
      Swal.fire('Usuario actualizado', usuario.nombre, 'success');
      return true;
    }));
  }

  cambiarImagen(file: File, id: string) {
    this.subirArchivoService.subirArchivo(file, 'usuarios', id)
    .then((result: any) => {
        this.usuario.img = result.usuario.img;
        Swal.fire('Usuario actualizado', this.usuario.nombre, 'success');
        this.guardarLocalStorage(id, this.token, this.usuario);
    })
    .catch(res => {
        console.log(res);
    });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICES + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuario(search: string) {
    let url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + search;
    return this.http.get(url)
    .pipe(map( (result: any) => result.usuarios)
    );
  }

  borarUsuario(id: string) {
    let url = URL_SERVICES + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url);
  }
}
