import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClientesService } from '../../services/clientes/clientes.service';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash, faPlus, faSave, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { ControlsValidationService } from '../../services/controls/controls-validation.service';
import { ConfiguracionService } from '../../services/configuracion/configuracion.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {
  dynamicForm: FormGroup;
  maxDate = new Date();
  estatusGeneral = [];
  estatus = [];
  estatusVisa = [];
  consulado = [];
  hascliente: boolean;
  id: string;
  textBoton: string;
  total: number = 1;
  precio = [];
  totalService = 0;
  faTrash = faTrash; faAdd = faPlus; faSave = faSave; faArrowAltCircleLeft = faArrowAltCircleLeft;
  constructor(private formBuilder: FormBuilder,
              public clienteService: ClientesService,
              private route: ActivatedRoute,
              private router: Router,
              private validationControl: ControlsValidationService,
              private configuracion: ConfiguracionService
              ) { }
  get f() { return this.dynamicForm.controls; }
  get c() { return this.f.children as FormArray; }
  get tt() { return this.dynamicForm ? this.total = this.c.controls.length + 1 : this.total = 1  }
  get ttl() { return this.total = this.total - 1 }

  ngAfterViewInit() {
    this.configuracion.obtenerPrecios().subscribe((res: any) => {
      this.precio = res.precio;
      this.totalService = this.precio[0].nombre;
    });
  }

  ngOnInit() {
      this.configuracion.obtenerEstatusGeneral().subscribe((res: any) => {
      this.estatusGeneral = res.estatusGeneral;
    });
    this.configuracion.obtenerEstatusVisa().subscribe((res: any) => {
      this.estatusVisa = res.estatusvisa;
    });
    this.configuracion.obtenerConsulado().subscribe((res: any) => {
      this.consulado = res.consulados;
    });
    this.dynamicForm = this.formBuilder.group({
      _id: [''],
      data: this.formBuilder.group({
        nombre: ['', Validators.required],
        apellidoP: ['', Validators.required],
        apellidoM: [''],
        correo: ['', Validators.required],
        contrasena: ['', Validators.required],
        telefono: ['', Validators.required],
        fechaNacimiento: [null],
        estatus: [''],
        noPasaporte: [''],
        fechaCitaPasaporte: [null],
        fechaExpedicion: [null],
        fechaVencimiento: [null],
        ciudadExpedicion: [''],
        ds160: [''],
        estatusVisa: [''],
        fechaCitaVisa: [null],
        fechaCAS: [null],
        fechaConsulado: [null],
        consulado: [''],
        total: [0],
        importeRecibido: [0],
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
      contrasena: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaNacimiento: [null],
      estatus: [''],
      noPasaporte: [''],
      fechaCitaPasaporte: [null],
      fechaExpedicion: [null],
      fechaVencimiento: [''],
      ciudadExpedicion: [''],
      ds160: [''],
      estatusVisa: [''],
      fechaCitaVisa: [null],
      fechaCAS: [null],
      fechaConsulado: [null],
      consulado: [''],
      createdAt: [new Date()],
      updatedAt: [null]
    }))
    this.tt;
  }

  agregarcliente(data: any, id: string) {
    this.c.push(this.formBuilder.group({
      id: [id],
      nombre: [data.nombre],
      apellidoP: [data.apellidoP],
      apellidoM: [data.apellidoM],
      correo: [data.correo],
      contrasena: [data.contrasena],
      telefono: [data.telefono],
      fechaNacimiento: [data.fechaNacimiento ? new Date(data.fechaNacimiento) : null],
      estatus: [this.setEstatus(data.estatus)],
      noPasaporte: [data.noPasaporte],
      fechaCitaPasaporte: [data.fechaCitaPasaporte ? new Date(data.fechaCitaPasaporte) : null],
      fechaExpedicion: [data.fechaExpedicion ? new Date(data.fechaExpedicion) : null],
      fechaVencimiento: [data.fechaVencimiento ? new Date(data.fechaVencimiento) : null],
      ciudadExpedicion: [data.ciudadExpedicion],
      ds160: [data.ds160],
      estatusVisa: [this.setEstatusvisa(data.estatusVisa)],
      fechaCitaVisa: [data.fechaCitaVisa ? new Date(data.fechaCitaVisa) : null],
      fechaCAS: [data.fechaCAS ? new Date(data.fechaCAS) : null],
      fechaConsulado: [data.fechaConsulado ? new Date(data.fechaConsulado) : null],
      consulado: [this.setConsulados(data.consulado)],
      createdAt: [data.createdAt],
      updatedAt: [data.updaterAt]
    }))
    this.tt;
  }

  eliminar(id: number) {
    this.c.removeAt(id);
    this.ttl;
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
    controlData.get('contrasena').setValue(data.contrasena);
    controlData.get('telefono').setValue(data.telefono);
    controlData.get('fechaNacimiento').setValue(data.fechaNacimiento ? new Date(data.fechaNacimiento) : null);
    controlData.get('estatus').setValue(this.setEstatus(data.estatus));
    controlData.get('noPasaporte').setValue(data.noPasaporte);
    controlData.get('fechaCitaPasaporte').setValue(data.fechaCitaPasaporte ? new Date(data.fechaCitaPasaporte) : null);
    controlData.get('fechaExpedicion').setValue(data.fechaExpedicion ? new Date(data.fechaExpedicion) : null);
    controlData.get('fechaVencimiento').setValue(data.fechaVencimiento ? new Date(data.fechaVencimiento) : null);
    controlData.get('ciudadExpedicion').setValue(data.ciudadExpedicion);
    controlData.get('ds160').setValue(data.ds160);
    controlData.get('estatusVisa').setValue(this.setEstatusvisa(data.estatusVisa));
    controlData.get('fechaCitaVisa').setValue(data.fechaCitaVisa ? new Date(data.fechaCitaVisa) : null);
    controlData.get('fechaCAS').setValue(data.fechaCAS ? new Date(data.fechaCAS) : null);
    controlData.get('fechaConsulado').setValue(data.fechaConsulado ? new Date(data.fechaConsulado) : null);
    controlData.get('consulado').setValue(this.setConsulados(data.consulado));
    controlData.get('total').setValue(data.total);
    controlData.get('importeRecibido').setValue(data.importeRecibido);
    controlData.get('createdAt').setValue(data.createdAt);
    controlData.get('updatedAt').setValue(data.updatedAt);
  }

  getObjec(obj: any) {
    const final: any = {};
    const finalObj: any = {};
    // finalObj._id = obj._id;
    finalObj.data = obj.data;
    finalObj.data.estatus = finalObj.data.estatus._id ? finalObj.data.estatus._id : '';
    finalObj.data.estatusVisa = finalObj.data.estatusVisa._id ? finalObj.data.estatusVisa._id : '';
    finalObj.data.consulado = finalObj.data.consulado._id ? finalObj.data.consulado._id : '';
    finalObj.data.total = ( this.total * this.precio[0].nombre ) | 0;
    // finalObj.data.fechaNacimiento ? finalObj.data.fechaNacimiento = moment(finalObj.data.fechaNacimiento).format('YYYY-MM-DD HH:mm:ss') : null;
    this.hascliente ? finalObj.data.updatedAt = new Date() : finalObj.data.updatedAt = null;
    finalObj.children = obj.children.map(x =>
      ( { data: { nombre: x.nombre,
                  apellidoP: x.apellidoP,
                  apellidoM: x.apellidoM,
                  correo: x.correo,
                  contrasena: x.contrasena,
                  telefono: x.telefono,
                  fechaNacimiento: x.fechaNacimiento,
                  estatus: x.estatus._id ? x.estatus._id : '',
                  noPasaporte: x.noPasaporte,
                  fechaCitaPasaporte: x.fechaCitaPasaporte,
                  fechaExpedicion: x.fechaExpedicion,
                  fechaVencimiento: x.fechaVencimiento,
                  ciudadExpedicion: x.ciudadExpedicion,
                  ds160: x.ds160,
                  estatusVisa: x.estatusVisa._id ? x.estatusVisa._id : '',
                  fechaCitaVisa: x.fechaCitaVisa,
                  fechaCAS: x.fechaCAS,
                  fechaConsulado: x.fechaConsulado,
                  consulado: x.consulado._id ? x.consulado._id : '',
                  createdAt: x.createdAt ? x.createdAt : new Date(),
                  updatedAt: this.hascliente ? new Date() : null
                 },
          _id: x.id } )
      );
      final.data = finalObj;
    return final;
  }

  setEstatus(id: string) {
    if (this.estatusGeneral && this.estatusGeneral.length > 0) {
      return this.estatusGeneral.find(x => x._id === id);
    }
  }
  setEstatusvisa(id: string) {
    if (this.estatusVisa && this.estatusVisa.length > 0) {
      return this.estatusVisa.find(x => x._id === id);
    }
  }

  setConsulados(id: string) {
    if (this.consulado && this.consulado.length > 0) {
      return this.consulado.find(x => x._id === id);
    }
  }

  resetForm() {
    this.dynamicForm.reset();
    this.router.navigate(['/dashboard']);
  }

}
