import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(public http: HttpClient) {}

  obtenerClientes(desde: number = 0) {
    let url = URL_SERVICES + '/cliente?desde=' + desde;
    return this.http.get(url);
  }

}
