import { Component, OnInit } from '@angular/core';
import { faTrash, faPlus, faSave, faDollarSign, faTags, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ClientesService } from '../../services/clientes/clientes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-dashboard-clientes-vianey',
  templateUrl: './dashboard-clientes-vianey.component.html',
  styleUrls: ['./dashboard-clientes-vianey.component.css']
})
export class DashboardClientesVianeyComponent implements OnInit {
  faTrash = faTrash; faDollarSign = faDollarSign; faTags = faTags; faAdd = faPlus; faSave = faSave; faPlusCircle = faPlusCircle;
  clientes = [];
  fomCliente: FormGroup;
  clienteData: any;
  constructor(private fb: FormBuilder,
              private clienteService: ClientesService,
              private modalService: NgbModal) { }

  get f() { return this.fomCliente.controls; }
  get p() { return this.f.pedido as FormArray; }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.GetClientsVianey().subscribe((res: any) => {
      this.clientes = res;
    });
  }

  save () {

  }
  
  eliminar(id: number) {
    this.p.removeAt(id);
  }

  borrarCliente(cliente: any) {

  }

  actulizarCliente(cliente: any) {
    console.log(cliente);
    this.clienteData = cliente;
    const modalRef = this.modalService.open(ModalComponent, { scrollable: true, size: 'lg' });
    modalRef.componentInstance.data = cliente;
    modalRef.result.then(res => console.log(res));
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent, { scrollable: true, size: 'lg' });
    modalRef.componentInstance.data = null;
    modalRef.result.then(res => console.log(res));
  }

}
