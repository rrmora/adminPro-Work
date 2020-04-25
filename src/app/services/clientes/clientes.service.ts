import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuarios/usuario.service';
import { map, catchError } from 'rxjs/operators';
import { NotificacionesService } from '../notificaciones/notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(public http: HttpClient, public usuarioService: UsuarioService, private toastrService:  NotificacionesService) {}

  crearCliente(cliente: any) {
    let url = URL_SERVICES + '/cliente';
    url += '?token=' + this.usuarioService.token;
    return this.http.post(url, cliente).pipe(
      map((result: any) => {
          this.toastrService.SuccesNotification('Cliente agregado', 'Cliente agregado con exito.')
          return result;
        }), catchError ( error => {
          this.toastrService.ErrorNotification(error.error.mensaje, error.error.errors.message)
          throw 'Error ' + error;
        })
    );
  }

  actualizarCliente(id: string, cliente: any) {
    let url = URL_SERVICES + '/cliente/' + id;
    url += '?token=' + this.usuarioService.token
    return this.http.put(url, cliente).pipe(
      map((result: any) => {
          this.toastrService.SuccesNotification('Cliente actualizado', 'Cliente actulizado con exito.')
          return result;
        }), catchError ( error => {
          this.toastrService.ErrorNotification(error.error.mensaje, error.error.errors.message)
          throw 'Error ' + error;
        })
    );
  }

  GetClients(desde: number = 0) {
    let url = URL_SERVICES + '/cliente';
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((value: any) => {
        value = value.clientes;
        let data = [];
        value.forEach(element => {
            let aux = element.data;
            aux.data['_id'] = element._id;
            data.push(element.data);
        });
        return data;
    })
    );
  }

  GetClientesFilter(data: any) {
    let url = URL_SERVICES + '/cliente/filter?fechaInicio=' + data.fechaInicio + '&fechaFinal=' + data.fechaFinal + '&nombre=' + data.nombre;
    url += '&token=' + this.usuarioService.token;
    return this.http.get(url).pipe(
      map((value: any) => {
        value = value.clientes;
        let data = [];
        value.forEach(element => {
            let aux = element.data;
            aux.data['_id'] = element._id;
            data.push(element.data);
        });
        return data;
      })
      );
  }

  GetClientById(id: string) {
    let url = URL_SERVICES + '/cliente/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url);
  }
}
