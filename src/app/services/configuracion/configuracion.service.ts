import { Injectable } from '@angular/core';
import { Configuracion } from '../../models/configuracion';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(public http: HttpClient, private toastrService: NotificacionesService, private usuarioService: UsuarioService) { }

  saveEstatusGeneral(config: Configuracion) {
    let url = URL_SERVICES + '/configuracion/estatusGeneral';
    return this.http.post(url, config).pipe(
      map((result: Configuracion) => {
        this.toastrService.SuccesNotification('Estatus general', 'Estatus general agregado.');
          return result;
        }), catchError ( error => {
          this.toastrService.ErrorNotification(error.error.mensaje, error.error.errors.message);
          throw 'Error ' + error;
        })
    );
  }

  obtenerEstatusGeneral() {
    let url = URL_SERVICES + '/configuracion/estatusGeneral';
    return this.http.get(url);
  }

  actualizarEstatusGeneral(config: Configuracion) {
    let url = URL_SERVICES + '/configuracion/estatusGeneral/' + config._id;
    url += '?token=' + this.usuarioService.token;
    return this.http.put(url, config).pipe(map((result: any) => {
      this.toastrService.SuccesNotification('Estatus general', 'Estatus general actualizado.');
      return true;
    }));
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICES + '/configuracion/estatusGeneral/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url).pipe(map((res: any) => {
      this.toastrService.SuccesNotification('Estatus general', 'Estatus eliminado.');
    }))
  }

  ////////// Estatus Visa \\\\\\\\\\\\
  saveEstatusVisa(config: Configuracion) {
    let url = URL_SERVICES + '/configuracion/estatusVisa';
    return this.http.post(url, config).pipe(
      map((result: Configuracion) => {
        this.toastrService.SuccesNotification('Estatus visa', 'Estatus visa agregado.');
          return result;
        }), catchError ( error => {
          this.toastrService.ErrorNotification(error.error.mensaje, error.error.errors.message);
          throw 'Error ' + error;
        })
    );
  }

  obtenerEstatusVisa() {
    let url = URL_SERVICES + '/configuracion/estatusVisa';
    return this.http.get(url);
  }

  actualizarEstatusVisa(config: Configuracion) {
    let url = URL_SERVICES + '/configuracion/estatusVisa/' + config._id;
    url += '?token=' + this.usuarioService.token;
    return this.http.put(url, config).pipe(map((result: any) => {
      this.toastrService.SuccesNotification('Estatus visa', 'Estatus visa actualizado.');
      return true;
    }));
  }

  borrarEstatusVisa(id: string) {
    let url = URL_SERVICES + '/configuracion/estatusVisa/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url).pipe(map((res: any) => {
      this.toastrService.SuccesNotification('Estatus visa', 'Estatus eliminado.');
    }))
  }

   ////////// Consulados \\\\\\\\\\\\
   saveConsulado(config: Configuracion) {
    let url = URL_SERVICES + '/configuracion/consulado';
    return this.http.post(url, config).pipe(
      map((result: Configuracion) => {
        this.toastrService.SuccesNotification('Consulado', 'Consulado agregado.');
          return result;
        }), catchError ( error => {
          this.toastrService.ErrorNotification(error.error.mensaje, error.error.errors.message);
          throw 'Error ' + error;
        })
    );
  }

  obtenerConsulado() {
    let url = URL_SERVICES + '/configuracion/consulado';
    return this.http.get(url);
  }

  actualizarConsulado(config: Configuracion) {
    let url = URL_SERVICES + '/configuracion/consulado/' + config._id;
    url += '?token=' + this.usuarioService.token;
    return this.http.put(url, config).pipe(map((result: any) => {
      this.toastrService.SuccesNotification('Consulado', 'Consulado actualizado.');
      return true;
    }));
  }

  borrarConsulado(id: string) {
    let url = URL_SERVICES + '/configuracion/consulado/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url).pipe(map((res: any) => {
      this.toastrService.SuccesNotification('Consulado', 'Consulado eliminado.');
    }))
  }

     ////////// Precio \\\\\\\\\\\\
     savePrecio(config: Configuracion) {
      let url = URL_SERVICES + '/configuracion/precio';
      return this.http.post(url, config).pipe(
        map((result: Configuracion) => {
          this.toastrService.SuccesNotification('Precio', 'Precio agregado.');
            return result;
          }), catchError ( error => {
            this.toastrService.ErrorNotification(error.error.mensaje, error.error.errors.message);
            throw 'Error ' + error;
          })
      );
    }
  
    obtenerPrecios() {
      let url = URL_SERVICES + '/configuracion/precio';
      return this.http.get(url);
    }
  
    actualizarPrecio(config: Configuracion) {
      let url = URL_SERVICES + '/configuracion/precio/' + config._id;
      url += '?token=' + this.usuarioService.token;
      return this.http.put(url, config).pipe(map((result: any) => {
        this.toastrService.SuccesNotification('Precio', 'Precio actualizado.');
        return true;
      }));
    }
}
