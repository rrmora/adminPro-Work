import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { ClientesService } from '../../services/clientes/clientes.service';
import { map } from 'rxjs/operators';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

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
  constructor(public clientService: ClientesService) { }

  ngOnInit() {

    this.clientService.GetClients().pipe(
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
  ).subscribe((result: any) => {
    this.files = result;
  });

  // this.clientService.GetClientById(this.id).subscribe(result => console.log(result));

    this.cols = [
      { field: '_id', header: 'ID'},
      { field: 'nombre', header: 'nombre' },
      { field: 'apellidoP', header: 'Apellido Paterno' },
      { field: 'apellidoM', header: 'Apellido Materno' }
  ];
  }
  editar(item: any) {
    console.log(item);
  }

}
