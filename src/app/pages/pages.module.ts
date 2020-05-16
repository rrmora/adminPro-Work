import { NgModule } from '@angular/core';
import {  CurrencyPipe } from '@angular/common';
// Modulos
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
/// NGPrime \\\\\\
import { TreeTableModule } from 'primeng/treetable';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
/////// Font Awesome \\\\\\\\\
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { FiltersComponent } from '../components/filters/filters.component';
import { HeadEstatusComponent } from '../components/head-estatus/head-estatus.component';
import { DashboardClientesVianeyComponent } from './dashboard-clientes-vianey/dashboard-clientes-vianey.component';
import { ModalComponent } from '../components/modal/modal.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraficasComponent,
        IncrementadorComponent,
        FiltersComponent,
        HeadEstatusComponent,
        GraficaDonaComponent,
        AccountSettingComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        ClientesComponent,
        ModalComponent,
        DashboardClientesVianeyComponent
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
        CalendarModule,
        TableModule,
        InputTextareaModule,
        DropdownModule,
        FontAwesomeModule,
        NgbModule,
        BrowserAnimationsModule
    ],
    providers: [ CurrencyPipe ],
    entryComponents: [ModalComponent]
})

export class PagesModule {}
