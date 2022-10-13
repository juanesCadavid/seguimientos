import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BannerComponent} from './components/banner/banner.component';
import { LoginComponent } from './components/login/login.component';
import {UsuariosComponent} from './components/usuarios/usuarios.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SoporteComponent} from './components/soporte/soporte.component'
import {AuthGuard} from '../app/rutasprotegidas/guards/auth.guard'

// PRIMENG
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {PaginatorModule} from 'primeng/paginator';
import {FileUploadModule} from 'primeng/fileupload';
import { KnobModule } from "primeng/knob";

//graficos
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SeguimientosListarComponent } from './components/seguimientos-listar/seguimientos-listar.component';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { SeguimientosPerfilComponent } from './components/seguimientos-perfil/seguimientos-perfil.component';
import { GestionSeguimientosComponent } from './components/gestion-seguimientos/gestion-seguimientos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { InterceptorsService } from './services/interceptors/interceptors.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SeguimientosListarComponent,
    BannerComponent,
    LoginComponent,
    UsuariosComponent,
    SoporteComponent,
    SeguimientosPerfilComponent,
    GestionSeguimientosComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    ButtonModule,
    CheckboxModule,
    PaginatorModule,
    FileUploadModule,
    KnobModule,
    NgxUiLoaderModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [AuthGuard,{provide:HTTP_INTERCEPTORS,useClass:InterceptorsService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
