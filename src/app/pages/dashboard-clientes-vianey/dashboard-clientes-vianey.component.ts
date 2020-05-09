import { Component, OnInit } from '@angular/core';
import { faTrash, faPlus, faSave, faDollarSign, faTags } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dashboard-clientes-vianey',
  templateUrl: './dashboard-clientes-vianey.component.html',
  styleUrls: ['./dashboard-clientes-vianey.component.css']
})
export class DashboardClientesVianeyComponent implements OnInit {
  faTrash = faTrash; faDollarSign = faDollarSign; faTags = faTags; faAdd = faPlus; faSave = faSave;
  clientes = [];
  fomCliente: FormGroup;
  constructor(private fb: FormBuilder) { }

  get f() { return this.fomCliente.controls; }
  get p() { return this.f.pedido as FormArray; }

  ngOnInit() {
    this.clientes = [
      {id: 1, nombre: 'Juana', apellido: 'Sanchez', tipoVenta: 'Credito'}
    ];
    this.fomCliente = this.fb.group({
      nombre: [''],
      apellido: [''],
      tipoVenta: [''],
      pedido: new FormArray([])
    });
    // this.agregarPedido();
  }

  agregarPedido() {
    this.p.push(this.fb.group({
      claveProducto: [''],
      nombreProducto: [''],
      descripcion: [''],
      precio: [0],
      precioCliente: [0],
      total: [0],
      estatus: ['']
    }))
  }

save () {

}
  eliminar(id: number) {
    this.p.removeAt(id);
  }

  borrarCliente(cliente: any) {

  }

  actulizarCliente(cliente: any) {

  }

}
