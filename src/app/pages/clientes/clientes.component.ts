import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes/clientes.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faTrash, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  dynamicForm: FormGroup;
  hascliente: boolean;
  id: string;
  textBoton: string;
  faTrash = faTrash; faAdd = faPlus; faSave = faSave;
  constructor(private formBuilder: FormBuilder, 
              public clienteService: ClientesService,
              private route: ActivatedRoute
              ) { }
  get f() { return this.dynamicForm.controls; }
  get c() { return this.f.children as FormArray; }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      _id: [''],
      data: this.formBuilder.group({
        nombre: [''],
        apellidoP: [''],
        apellidoM: [''],
        noPasaporte: [''],
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
      nombre: [''],
      apellidoP: [''],
      apellidoM: [''],
      noPasaporte: [''],
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
      noPasaporte: [data.noPasaporte],      
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
    if (this.hascliente) {
        this.clienteService.actualizarCliente(this.id, obj).subscribe(result => console.log(result))
    } else {
        this.clienteService.crearCliente(obj).subscribe(result => { console.log(result);});
    }
    console.log(obj);
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
    controlData.get('noPasaporte').setValue(data.noPasaporte);
    controlData.get('createdAt').setValue(data.createdAt);
    controlData.get('updatedAt').setValue(data.updatedAt);
  }

  getObjec(obj: any) {
    const final: any = {};
    const finalObj: any = {};
    // finalObj._id = obj._id;
    finalObj.data = obj.data;
    this.hascliente ? finalObj.data.updatedAt = new Date() : finalObj.data.updatedAt = null;
    finalObj.children = obj.children.map(x => 
      ( { data: { nombre: x.nombre, 
                  apellidoP: x.apellidoP, 
                  apellidoM: x.apellidoM, 
                  noPasaporte: x.noPasaporte,
                  createdAt: x.createdAt ? x.createdAt : new Date(),
                  updatedAt: this.hascliente ? new Date() : null
                 },
          _id: x.id } )
      );
      final.data = finalObj;
    return final;
  }

}
