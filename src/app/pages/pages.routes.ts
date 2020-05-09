import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { Routes, RouterModule } from '@angular/router';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DashboardClientesVianeyComponent } from './dashboard-clientes-vianey/dashboard-clientes-vianey.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graficas', component: GraficasComponent, data: { titulo: 'Gráficas' }},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJS' }},
            { path: 'account-settings', component: AccountSettingComponent, data: { titulo: 'Ajustes' }},
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' }},
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' }},
            { path: 'clientes', component: ClientesComponent, data: { titulo: 'Clientes Visa' }},
            { path: 'clientes/:id', component: ClientesComponent, data: { titulo: 'Clientes Visa' }},
            { path: 'clientes-vianey', component: DashboardClientesVianeyComponent, data: { titulo: 'Clientes Vianey' }},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROTES = RouterModule.forChild(pagesRoutes);
