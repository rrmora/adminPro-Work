import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuarios.model';
import { UsuarioService } from '../../services/usuarios/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  image: File;
  imgTemp: string | ArrayBuffer;
  constructor(public usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    console.log(usuario);
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this.usuarioService.actualizarUsuario(this.usuario).subscribe((result: any) => {
      console.log(result);
    });
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

  agregarImg() {
    this.usuarioService.cambiarImagen(this.image, this.usuario._id);
  }
}
