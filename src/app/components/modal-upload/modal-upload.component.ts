import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  oculto: string = '';
  image: File;
  imgTemp: string | ArrayBuffer;
  constructor(public subirArchivoService: SubirArchivoService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  seleccionarImg(archivo: File) {
    if (!archivo) {
      this.image = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      console.log('Solo se pueden agregar imagenes');
      this.image = null;
      return;
    }
    this.image = archivo;
    let reader = new FileReader();
    let urlImtem = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

}
