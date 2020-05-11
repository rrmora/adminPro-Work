import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes/clientes.service';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash, faPlus, faSave, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { ControlsValidationService } from '../../services/controls/controls-validation.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  dynamicForm: FormGroup;
  maxDate = new Date();
  estatus = [];
  estatusVisa = [];
  hascliente: boolean;
  id: string;
  textBoton: string;
  faTrash = faTrash; faAdd = faPlus; faSave = faSave; faArrowAltCircleLeft = faArrowAltCircleLeft;
  constructor(private formBuilder: FormBuilder,
              public clienteService: ClientesService,
              private route: ActivatedRoute,
              private router: Router,
              private validationControl: ControlsValidationService
              ) { }
  get f() { return this.dynamicForm.controls; }
  get c() { return this.f.children as FormArray; }

  ngOnInit() {
    this.setEstatus(0);
    this.setEstatusvisa(0);
    this.dynamicForm = this.formBuilder.group({
      _id: [''],
      data: this.formBuilder.group({
        nombre: ['', Validators.required],
        apellidoP: ['', Validators.required],
        apellidoM: [''],
        correo: ['', Validators.required],
        telefono: ['', Validators.required],
        fechaNacimiento: [null],
        estatus: [1],
        noPasaporte: [''],
        fechaCitaPasaporte: [null],
        ds160: [''],
        estatusVisa: [1],
        fechaCitaVisa: [null],
        createdAt: [new Date()],
        updatedAt: [null]
      }),
      children: new FormArray([])
    })
    this.route.params.subscribe(params => {
      params['id'] ? this.hascliente = true : this.hascliente = false;
      this.hascliente ? this.id = params['id'] : this.id = '';
      this.hascliente ? this.textBoton = 'Actualizar' : this.textBoton = 'Guardar'
    });
    this.hascliente ? this.clienteService.GetClientById(this.id).subscribe(result => this.asingarValores(result)) : '';

  }

  agregar() {
    this.c.push(this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidoP: ['', Validators.required],
      apellidoM: [''],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaNacimiento: [null],
      estatus: [1],
      noPasaporte: [''],
      fechaCitaPasaporte: [null],
      ds160: [''],
      estatusVisa: [1],
      fechaCitaVisa: [null],
      createdAt: [new Date()],
      updatedAt: [null]
    }))
  }

  agregarcliente(data: any, id: string) {
    this.c.push(this.formBuilder.group({
      id: [id],
      nombre: [data.nombre],
      apellidoP: [data.apellidoP],
      apellidoM: [data.apellidoM],
      correo: [data.correo],
      telefono: [data.telefono],
      fechaNacimiento: [data.fechaNacimiento ? new Date(data.fechaNacimiento) : null],
      estatus: [this.setEstatus(data.estatus)],
      noPasaporte: [data.noPasaporte],
      fechaCitaPasaporte: [data.fechaCitaPasaporte ? new Date(data.fechaCitaPasaporte) : null],
      ds160: [data.ds160],
      estatusVisa: [this.setEstatusvisa(data.estatusVisa)],
      fechaCitaVisa: [data.fechaCitaVisa ? new Date(data.fechaCitaVisa) : null],
      createdAt: [data.createdAt],
      updatedAt: [data.updaterAt]
    }))
  }

  eliminar(id: number) {
    this.c.removeAt(id);
  }

  save() {
    let value = this.dynamicForm.getRawValue();
    let obj = this.getObjec(value);
    if (this.dynamicForm.valid) {
      if (this.hascliente) {
          this.clienteService.actualizarCliente(this.id, obj).subscribe(result => this.resetForm());
      } else {
          this.clienteService.crearCliente(obj).subscribe(result => this.resetForm());
      }
    } else {
      this.validationControl.validateAllFormFields(this.dynamicForm);
      if (this.dynamicForm.get('children')) {
        this.validationControl.validateAllFormFields(this.dynamicForm.get('children') as FormGroup);
      }
    }
  }

  asingarValores(cliente: any) {
    console.log(cliente);
    let data = cliente.cliente.data.data;
    this.asignarValoresObjPrincipal(cliente.cliente._id, data);
      let d = cliente.cliente.data.children;
      for(let i = 0; i < d.length; i++){
        this.agregarcliente(d[i].data, d[i]._id);
      }
  }

  asignarValoresObjPrincipal(id: string, data: any) {
    let controlData = this.dynamicForm.get('data');
    this.dynamicForm.controls._id.setValue(id);
    controlData.get('nombre').setValue(data.nombre);
    controlData.get('apellidoP').setValue(data.apellidoP);
    controlData.get('apellidoM').setValue(data.apellidoM);
    controlData.get('correo').setValue(data.correo);
    controlData.get('telefono').setValue(data.telefono);
    controlData.get('fechaNacimiento').setValue(data.fechaNacimiento ? new Date(data.fechaNacimiento) : null);
    controlData.get('estatus').setValue(this.setEstatus(data.estatus));
    controlData.get('noPasaporte').setValue(data.noPasaporte);
    controlData.get('fechaCitaPasaporte').setValue(data.fechaCitaPasaporte ? new Date(data.fechaCitaPasaporte) : null);
    controlData.get('ds160').setValue(data.ds160);
    controlData.get('estatusVisa').setValue(this.setEstatusvisa(data.estatusVisa));
    controlData.get('fechaCitaVisa').setValue(data.fechaCitaVisa ? new Date(data.fechaCitaVisa) : null);
    controlData.get('createdAt').setValue(data.createdAt);
    controlData.get('updatedAt').setValue(data.updatedAt);
  }

  getObjec(obj: any) {
    const final: any = {};
    const finalObj: any = {};
    // finalObj._id = obj._id;
    finalObj.data = obj.data;
    finalObj.data.estatus = finalObj.data.estatus.id ? finalObj.data.estatus.id : 1;
    finalObj.data.estatusVisa = finalObj.data.estatusVisa.id ? finalObj.data.estatusVisa.id : 1;
    // finalObj.data.fechaNacimiento ? finalObj.data.fechaNacimiento = moment(finalObj.data.fechaNacimiento).format('YYYY-MM-DD HH:mm:ss') : null;
    this.hascliente ? finalObj.data.updatedAt = new Date() : finalObj.data.updatedAt = null;
    finalObj.children = obj.children.map(x =>
      ( { data: { nombre: x.nombre,
                  apellidoP: x.apellidoP,
                  apellidoM: x.apellidoM,
                  correo: x.correo,
                  telefono: x.telefono,
                  fechaNacimiento: x.fechaNacimiento,
                  estatus: x.estatus.id ? x.estatus.id : 1,
                  noPasaporte: x.noPasaporte,
                  fechaCitaPasaporte: x.fechaCitaPasaporte,
                  ds160: x.ds160,
                  estatusVisa: x.estatusVisa.id ? x.estatusVisa.id : 1,
                  fechaCitaVisa: x.fechaCitaVisa,
                  createdAt: x.createdAt ? x.createdAt : new Date(),
                  updatedAt: this.hascliente ? new Date() : null
                 },
          _id: x.id } )
      );
      final.data = finalObj;
    return final;
  }

  setEstatus(id: number) {
      this.estatus = [
        { id: 1, nombre: 'Nuevo cliente' },
        { id: 2, nombre: 'Llenando cuestionario' },
        { id: 3, nombre: 'En proceso DS160' },
        { id: 4, nombre: 'En proceso pago visa' },
        { id: 5, nombre: 'Citas programadas' },
        { id: 6, nombre: 'Cancelada' }
      ]
      if (id !== 0) {
        return this.estatus.find(x => x.id === id);
      }
  }
  setEstatusvisa(id: number) {
    this.estatusVisa = [
      { id: 1, nombre: 'En tramite' },
      { id: 2, nombre: 'Aprobada' },
      { id: 3, nombre: 'Rechazada' },
      { id: 4, nombre: 'En investigacion' },
      { id: 5, nombre: 'Cancelada' }
    ]
    if (id !== 0) {
      return this.estatusVisa.find(x => x.id === id);
    }
  }

  resetForm() {
    this.dynamicForm.reset();
    this.router.navigate(['/dashboard']);
  }

}
