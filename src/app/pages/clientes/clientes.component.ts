import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cargando: boolean = true;
  constructor(public clienteService: ClientesService) { }

  ngOnInit() {
    this.cargando = true;
    this.obtenerClientes();
    this.cargando = false;

  }

  buscarUsuario(search: string) {
    if (search.length > 0) {
      console.log(search);
    }
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe((result: any) => {
      console.log(result.clientes[0].data.data.nombre);
      console.log(result.clientes[0].data.children[0].data.nombre);
    });
  }

}
