import { NgModule } from '@angular/core';
// Modulos
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
/// NGPrime \\\\\\
import { TreeTableModule } from 'primeng/treetable';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROTES } from './pages.routes';
// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDonaComponent } from './graficas/grafica-dona/grafica-dona.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ClientesComponent } from './clientes/clientes.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraficasComponent,
        IncrementadorComponent,
        GraficaDonaComponent,
        AccountSettingComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        ClientesComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraficasComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROTES,
        ReactiveFormsModule,
        FormsModule,
        ChartsModule,
        PipesModule,
        TreeTableModule,
        InputTextModule,
        ButtonModule,
        FontAwesomeModule
    ]
})

export class PagesModule {}
