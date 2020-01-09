import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
  let url = URL_SERVICES + '/img';
  if (!img) {
    return url + '/usuario/xxx';
  }

  if (img.indexOf('https') >= 0) {
    return img;
  }
  let nombre: string;
  switch (tipo) {
      case 'usuario':
        // tslint:disable-next-line: no-unused-expression
      nombre = `/usuarios/${img}`;
      // url + '/usuarios/' + img;
      break;
      case 'medico':
      // tslint:disable-next-line: no-unused-expression
      nombre = `/medicos/${img}`;
      // url + '/medicos/' + img;
      break;
      case 'hospital':
      // tslint:disable-next-line: no-unused-expression
      nombre = `/usuarios/${img}`;
      // url + '/usuarios/' + img;
      break;
      default:
        console.log('tipo de img no existe, usuario, medico, hospital');
      // tslint:disable-next-line: no-unused-expression
        nombre = `/usuario/${img}`;
      // url + '/usuario/xxx';
  }
  return url + nombre;
  }

}
