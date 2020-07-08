import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings/settings.service';
import {SharedService, SidebarService, UsuarioService, LoginGardGuard, SubirArchivoService, ClientesService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { VerificarTokenGuard } from './guards/verificar-token.guard';
import { AdminGuardGuard } from './guards/admin-guard.guard';

@NgModule({
  declarations: [],
  providers: [SettingsService, SharedService, SidebarService, ModalUploadService, VerificarTokenGuard,
              UsuarioService, LoginGardGuard, SubirArchivoService, ClientesService, AdminGuardGuard],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
