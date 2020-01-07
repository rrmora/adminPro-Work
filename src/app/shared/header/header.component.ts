import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { Usuario } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

}
