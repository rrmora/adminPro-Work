import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Inicio',
      icono: 'mdi mdi-account-card-details',
      submenu: [
        { titulo: 'Blog', url: '/blog' },
        // { titulo: 'Clientes', url: '/clientes' },
        // { titulo: 'Médicos', url: '/medicos' },
      ]
    },
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Inicio Clientes Visa', url: '/dashboard' },
        { titulo: 'Agregar Clientes Visa', url: '/clientes' },
        // { titulo: 'Inicio Clientes Vianey', url: '/clientes-vianey' },
        { titulo: 'Gráficas', url: '/graficas' },
        // { titulo: 'Promesas', url: '/promesas' },
        // { titulo: 'RxJs', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        // { titulo: 'Clientes', url: '/clientes' },
        // { titulo: 'Médicos', url: '/medicos' },
      ]
    }
  ];
  constructor() { }
}
