import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(public http: HttpClient, public usuarioService: UsuarioService) {}

  GetClients(desde: number = 0) {
    let url = URL_SERVICES + '/cliente?desde=' + desde;
    return this.http.get(url);
  }

  GetClientById(id: string) {
    let url = URL_SERVICES + '/cliente/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.get(url);
  }
}
