import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { ClientesService } from '../../services/clientes/clientes.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  files: TreeNode[];
  cols: any[];
  data =  [];
  id = '5e8021aedb715f43a0a22cbe';
  faEdit = faEdit;
  filters: FormGroup;
  constructor(public clientService: ClientesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.clientService.GetClients().subscribe((result: any) => {
    this.files = result;
  });

    this.cols = [
      { field: 'nombre', header: 'nombre' },
      { field: 'apellidoP', header: 'Apellido Paterno' },
      { field: 'apellidoM', header: 'Apellido Materno' },
      { field: 'createdAt', header: 'Fecha' }
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

}
