import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings/settings.service';
// import { SharedService } from './shared/shared.service';
// import { SidebarService } from './shared/sidebar.service';
// import { UsuarioService } from './usuarios/usuario.service';
import {SharedService, SidebarService, UsuarioService, LoginGardGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  providers: [SettingsService, SharedService, SidebarService, UsuarioService, LoginGardGuard],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
