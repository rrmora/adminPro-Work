import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { ClientesService } from '../../services/clientes/clientes.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  files: TreeNode[];
  cols: any[];
  data =  [];
  estatus = [];
  estatusVisa = [];
  estatusTitulo = 'Estatus general'
  id = '5e8021aedb715f43a0a22cbe';
  faEdit = faEdit;
  filters: FormGroup;
  constructor(public clientService: ClientesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.setEstatus(0);
    this.setEstatusvisa(0);
    this.clientService.GetClients().subscribe((result: any) => {
    this.files = result;
  });

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellidoP', header: 'Apellido Paterno' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'fechaCitaPasaporte', header: 'Fecha Pasaporte' },
      { field: 'fechaCitaVisa', header: 'Fecha visa' },
      { field: 'createdAt', header: 'Fecha Tramite' }
  ];
  }
  editar(item: any) {
    if (item.parent) {
      this.router.navigate(['/clientes', item.parent.data._id]);
    } else {
      this.router.navigate(['/clientes', item.node.data._id]);

    }
  }

  filteResult(event) {
   this.files = [];
   this.files = event;
  }
  setEstatus(id: number) {
    this.estatus = [
      { id: 1, nombre: 'Nuevo cliente', key: 'N-C', color: '#003049' },
      { id: 2, nombre: 'Llenando cuestionario', key: 'Ll-C', color: '#f77f00' },
      { id: 3, nombre: 'En proceso DS160', key: 'P-DS', color: '#90be6d' },
      { id: 4, nombre: 'En proceso pago visa', key: 'P-PV', color: '#05668d' },
      { id: 5, nombre: 'Citas programadas', key: 'C-P', color: '#70c1b3' },
      { id: 6, nombre: 'Cancelada', key: 'C', color: '#d62828' }
    ]
    if (id !== 0) {
      return this.estatus.find(x => x.id === id);
    }
}
setEstatusvisa(id: number) {
  this.estatusVisa = [
    { id: 1, nombre: 'En tramite', key: 'T', color: '#118ab2' },
    { id: 2, nombre: 'Aprobada', key: 'A', color: '#43aa8b' },
    { id: 3, nombre: 'Rechazada', key: 'R', color: '#ef476f' },
    { id: 4, nombre: 'En investigacion', key: 'I', color: '#ffd166' },
    { id: 5, nombre: 'Cancelada', key: 'C', color: '#d62828' }
  ]
  if (id !== 0) {
    return this.estatusVisa.find(x => x.id === id);
  }
}

setEstatusPago() {
  
}

}
