import { NgModule } from '@angular/core';
// Modulos
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROTES } from './pages.routes';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraficasComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraficasComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROTES
    ]
})

export class PagesModule {}
