import { NgModule } from '@angular/core';
// Modulos
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROTES } from './pages.routes';
// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDonaComponent } from './graficas/grafica-dona/grafica-dona.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraficasComponent,
        IncrementadorComponent,
        GraficaDonaComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraficasComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule {}
