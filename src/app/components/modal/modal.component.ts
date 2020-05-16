import { Component, OnInit, Input } from '@angular/core';
import { faPlusCircle, faTrash, faPlus, faSave, faDollarSign, faTags } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ControlsValidationService } from '../../services/controls/controls-validation.service';
import { ClientesService } from '../../services/clientes/clientes.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  faPlusCircle = faPlusCircle; faTrash = faTrash; faDollarSign = faDollarSign; faTags = faTags; faAdd = faPlus; faSave = faSave;
  formCliente: FormGroup;
  cantidad: number = 0;
  totalSum: number = 0;
  totalSumCliente: number = 0;
  myFormValueChanges$;
  tipoVentaArr= [];
  modalTitle = 'Agregar cliente y pedido'
  @Input() data: any;
  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private clientes: ClientesService,
              private validateControls: ControlsValidationService) { }

  get f() { return this.formCliente.controls; }
  get p() { return this.f.pedido as FormArray; }

  ngOnInit() {
    console.log(this.data);
    this.setTipoVenta();
    this.formCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: [''],
      tipoVenta: [1],
      pedido: new FormArray([])
    });
    this.agregarPedido();
    this.myFormValueChanges$ = this.formCliente.controls['pedido'].valueChanges;
    this.myFormValueChanges$.subscribe(units => this.updateTotales(units))
  }

  agregarPedido() {
    this.p.push(this.fb.group({
      claveProducto: [''],
      nombreProducto: ['', Validators.required],
      descripcion: [''],
      cantidad: [1, Validators.min(1)],
      precioUnidad: ['', [Validators.min(1), Validators.required]],
      precioCliente: ['', [Validators.min(1), Validators.required]],
      totalUnidad: [''],
      estatus: ['']
    }))
    // lst.map(o => o.price).reduce((a, c) => { return a + c });
  }

save () {
  console.log(this.formCliente);
  if (this.formCliente.valid) {
      const objFinal: any = {};
      let value = this.formCliente.getRawValue();
      let aux = value.tipoVenta.id ? value.tipoVenta.id : 1;
      value.tipoVenta = aux;
      objFinal.data = value;
      console.log(objFinal);
      this.clientes.crearClienteViany(objFinal).subscribe(res => console.log(res));
  } else {
    this.validateControls.validateAllFormFields(this.formCliente);
    this.validateControls.validateAllFormFields(this.formCliente.get('pedido') as FormGroup);
  }
}
  eliminar(id: number) {
    this.p.removeAt(id);
  }

  openModal(modalContent) {
    this.modalService.open(modalContent, { scrollable: true, size: 'lg' });
  }

  closeModal() {
    this.formCliente.reset();
    this.modalService.dismissAll()
  }

  updateTotales(unidades: any) {
    // const control = <FormArray>this.formCliente.controls['pedido'];
    this.totalSum = 0;
    this.totalSumCliente = 0;
    this.cantidad = 0;
    for (let i in unidades) {
      let totalUnitPrice = (unidades[i].cantidad*unidades[i].precioUnidad);
      let totalUnitPriceCliente = (unidades[i].cantidad*unidades[i].precioCliente);
      let cant = unidades[i].cantidad;
      // now format total price with angular currency pipe
      // let totalUnitPriceFormatted = this.currencyPipe.transform(totalUnitPrice, 'USD', 'symbol-narrow', '1.2-2');
      // update total sum field on unit and do not emit event myFormValueChanges$ in this case on units
      // control.at(+i).get('unitTotalPrice').setValue(totalUnitPriceFormatted, {onlySelf: true, emitEvent: false});
      // update total price for all units
      this.cantidad += cant;
      this.totalSum += totalUnitPrice;
      this.totalSumCliente += totalUnitPriceCliente;
    }

  }

  setTipoVenta() {
    this.tipoVentaArr = [
      { id: 1, nombre: 'Contado' },
      { id: 2, nombre: 'Credito' }
    ]
  }
}
