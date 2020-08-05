import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { ClientesService } from '../../services/clientes/clientes.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfiguracionService } from '../../services/configuracion/configuracion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  files: TreeNode[];
  cols: any[];
  data =  [];
  estatusGeneral = [];
  estatus = [];
  estatusVisa = [];
  estatusTitulo = 'Estatus general'
  id = '5e8021aedb715f43a0a22cbe';
  faEdit = faEdit;
  filters: FormGroup;
  value;
  constructor(public clientService: ClientesService, private fb: FormBuilder, private router: Router, private configuracion: ConfiguracionService) { }

  ngOnInit() {
    this.value = new Date();
    // this.setEstatus('');
    // this.setEstatusvisa(0);
    this.clientService.GetClients().subscribe((result: any) => {
    this.files = result;
  });

  this.configuracion.obtenerEstatusGeneral().subscribe((res: any) => {
    this.estatusGeneral = res.estatusGeneral;
  });

  this.configuracion.obtenerEstatusVisa().subscribe((res: any) => {
    this.estatusVisa = res.estatusvisa;
  })

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

  setEstatusColor(id: string) {
    if (this.estatusGeneral && this.estatusGeneral.length > 0) {
      return this.estatusGeneral.find(x => x._id === id).color;
     }
  }

  setEstatusCode(id: string) {
    if (this.estatusGeneral && this.estatusGeneral.length > 0) {
     return this.estatusGeneral.find(x => x._id === id).abre;
    }
  }

  setEstatusvisaColor(id: string) {
    if (this.estatusVisa && this.estatusVisa.length > 0) {
      return this.estatusVisa.find(x => x._id === id).color;
    }
  }

  setEstatusVisaCode(id: string) {
    if (this.estatusVisa && this.estatusVisa.length > 0) {
      return this.estatusVisa.find(x => x._id === id).abre;
    }
  }


setEstatusPago() {
  
}

}
