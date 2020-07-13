import { Component, OnInit } from '@angular/core';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfiguracionService } from '../../services/configuracion/configuracion.service';
import { ControlsValidationService } from '../../services/controls/controls-validation.service';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  faTrash = faTrash; faEdit = faEdit; faSave = faSave;
  estatusGeneral = [];
  estatusVisa = [];
  consulados = [];
  precio = [];
  formEstatusGeneral: FormGroup;
  formEstatusVisa: FormGroup;
  formConsulados: FormGroup;
  formPrecio: FormGroup;
  constructor(private formBuilder: FormBuilder, 
              private configuracionService: ConfiguracionService,
              private validationControl: ControlsValidationService,
              private toast: NotificacionesService) { }

  ngOnInit() {
    this.formEstatusGeneral = this.formBuilder.group({
      _id: [''],
      nombre: ['', Validators.required]
    });
    this.formEstatusVisa = this.formBuilder.group({
      _id: [''],
      nombre: ['', Validators.required]
    });
    this.formConsulados = this.formBuilder.group({
      _id: [''],
      nombre: ['', Validators.required]
    });
    this.formPrecio = this.formBuilder.group({
      _id: [''],
      nombre: ['', Validators.required]
    });
    this.getEstatusGeneral();
    this.getEstatusVisa();
    this.getConsulados();
    this.getPrecios();
  }

  agregarActualizarEG(estatus: any) {
    if (this.formEstatusGeneral.valid) {
      if (estatus._id !== '' && estatus._id !== null) {
        this.actualizarEG(estatus);
        this.formEstatusGeneral.reset();
      } else {
        this.agregarEG();
        this.formEstatusGeneral.reset();
      }
    } else {
      this.validationControl.validateAllFormFields(this.formEstatusGeneral);
    }
  }

  agregarEG() {
    this.configuracionService.saveEstatusGeneral(this.formEstatusGeneral.getRawValue()).subscribe(res => this.getEstatusGeneral());
  }

  editarEstatusGeneral(estatus: any) {
    this.formEstatusGeneral.setValue({_id: estatus._id, nombre: estatus.nombre });
  }

  actualizarEG(estatus: any) {
    this.configuracionService.actualizarEstatusGeneral(estatus).subscribe(res => this.getEstatusGeneral());
  }

  getEstatusGeneral() {
    this.configuracionService.obtenerEstatusGeneral().subscribe((res: any) => { 
      this.estatusGeneral = res.estatusGeneral}
    );
  }

  borrarEstatusGeneral(estatus: any) {
    this.configuracionService.borrarUsuario(estatus._id).subscribe(res => { 
      this.getEstatusGeneral(); 
      this.formEstatusGeneral.reset();
    });
  }

  ////// Estatus Visa \\\\\\\\
  agregarActualizarEV(estatus: any) {
    if (this.formEstatusVisa.valid) {
      if (estatus._id !== '' && estatus._id !== null) {
        this.actualizarEV(estatus);
        this.formEstatusVisa.reset();
      } else {
        this.agregarEV();
        this.formEstatusVisa.reset();
      }
    } else {
      this.validationControl.validateAllFormFields(this.formEstatusVisa);
    }
  }

  agregarEV() {
    this.configuracionService.saveEstatusVisa(this.formEstatusVisa.getRawValue()).subscribe(res => this.getEstatusVisa());
  }

  editarEstatusVisa(estatus: any) {
    this.formEstatusVisa.setValue({ _id: estatus._id, nombre: estatus.nombre} );
  }

  actualizarEV(estatus: any) {
    this.configuracionService.actualizarEstatusVisa(estatus).subscribe(res => this.getEstatusVisa());
  }

  getEstatusVisa() {
    this.configuracionService.obtenerEstatusVisa().subscribe((res: any) => {
      this.estatusVisa = res.estatusvisa;
    })
  }

  borrarEstatusVisa(estatus: any) {
    this.configuracionService.borrarEstatusVisa(estatus._id).subscribe(res => this.getEstatusVisa());
  }

   ////// Consulados \\\\\\\\
   agregarActualizarconsulados(estatus: any) {
    if (this.formConsulados.valid) {
      if (estatus._id !== '' && estatus._id !== null) {
        this.actualizarConsuldado(estatus);
        this.formConsulados.reset();
      } else {
        this.agregarConsulado();
        this.formConsulados.reset();
      }
    } else {
      this.validationControl.validateAllFormFields(this.formConsulados);
    }
  }

  agregarConsulado() {
    this.configuracionService.saveConsulado(this.formConsulados.getRawValue()).subscribe(res => this.getConsulados());
  }

  editarConsuldado(estatus: any) {
    this.formConsulados.setValue({ _id: estatus._id, nombre: estatus.nombre} );
  }

  actualizarConsuldado(estatus: any) {
    this.configuracionService.actualizarConsulado(estatus).subscribe(res => this.getConsulados());
  }

  getConsulados() {
    this.configuracionService.obtenerConsulado().subscribe((res: any) => {
      this.consulados = res.consulados;
    })
  }

  borrarConsulado(estatus: any) {
    this.configuracionService.borrarConsulado(estatus._id).subscribe(res => this.getConsulados());
  }

   ////// Precio \\\\\\\\
   agregarActualizarPrecio(estatus: any) {
    if (this.formPrecio.valid) {
      if (estatus._id !== '' && estatus._id !== null) {
        this.actualizarPrecio(estatus);
        this.formPrecio.reset();
      } else {
        if (this.precio && this.precio.length > 0) {
          this.toast.WarningNotification('Advertencia', 'Debes editar el precio agregado.');
          this.formPrecio.reset();
        } else {
          this.agregarPrecio();
          this.formPrecio.reset();
        }
      }
    } else {
      this.validationControl.validateAllFormFields(this.formPrecio);
    }
  }

  agregarPrecio() {
    this.configuracionService.savePrecio(this.formPrecio.getRawValue()).subscribe(res => this.getPrecios());
  }

  editarPrecio(estatus: any) {
    this.formPrecio.setValue({ _id: estatus._id, nombre: estatus.nombre} );
  }

  actualizarPrecio(estatus: any) {
    this.configuracionService.actualizarPrecio(estatus).subscribe(res => this.getPrecios());
  }

  getPrecios() {
    this.configuracionService.obtenerPrecios().subscribe((res: any) => {
      this.precio = res.precio;
    })
  }
}
