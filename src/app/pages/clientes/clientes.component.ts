import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes/clientes.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  dynamicForm: FormGroup;
  hascliente: boolean;
  id = '5e8021aedb715f43a0a22cbe';
  urlId: string;
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
        apellidoM: ['']
      }),
      children: new FormArray([])
    })
    this.route.params.subscribe(params => {
      params['id'] ? this.hascliente = true : this.hascliente = false;
    });
    this.hascliente ? this.clienteService.GetClientById(this.id).subscribe(result => this.asingarValores(result)) : '';
    
  }

  agregar() {
    this.c.push(this.formBuilder.group({
      nombre: [''],
      apellidoP: [''],
      apellidoM: ['']
    }))
  }

  agregarcliente(data: any, id: string) {
    this.c.push(this.formBuilder.group({
      id: [id],
      nombre: [data.nombre],
      apellidoP: [data.apellidoP],
      apellidoM: [data.apellidoM]
    }))
  }

   asingarValores(cliente: any) {
     console.log(cliente);
     let data = cliente.cliente.data.data;
     let controlData = this.dynamicForm.get('data');
     this.dynamicForm.controls._id.setValue(cliente.cliente._id)
     controlData.get('nombre').setValue(data.nombre)
     controlData.get('apellidoP').setValue(data.apellidoP)
     controlData.get('apellidoM').setValue(data.apellidoM)
      let d = cliente.cliente.data.children;
      for(let i = 0; i < d.length; i++){
        this.agregarcliente(d[i].data, d[i]._id);
      }
   }

  eliminar(id: number) {
    this.c.removeAt(id);
  }

  save() {
    
    let value = this.dynamicForm.getRawValue();
    let obj = this.getObjec(value);
    console.log(obj);
    }

  getObjec(obj: any) {
    const finalObj: any = {};
    finalObj._id = obj._id;
    finalObj.data = obj.data;
    finalObj.children = obj.children.map(x => 
      ( { data: { nombre: x.nombre, apellidoP: x.apellidoP, apellidoM: x.apellidoM },
          _id: x.id } )
      );
    return finalObj;
  }

}
