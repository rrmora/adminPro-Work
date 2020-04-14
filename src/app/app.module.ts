import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Modulos
import { PagesModule } from './pages/pages.module';
// Rutas
import { APP_ROUTES } from './app-routing.module';
// Servicios
import { ServiceModule } from './services/service.module';
// Componentes
import { RegisterComponent } from './login/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
