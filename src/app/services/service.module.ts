import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings/settings.service';
// import { SharedService } from './shared/shared.service';
// import { SidebarService } from './shared/sidebar.service';
// import { UsuarioService } from './usuarios/usuario.service';
import {SharedService, SidebarService, UsuarioService, LoginGardGuard, SubirArchivoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  providers: [SettingsService, SharedService, SidebarService, ModalUploadService,
              UsuarioService, LoginGardGuard, SubirArchivoService],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
