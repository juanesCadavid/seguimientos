import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './rutasprotegidas/guards/auth.guard';
import {SeguimientosListarComponent } from './components/seguimientos-listar/seguimientos-listar.component';
import {LoginComponent} from './components/login/login.component';
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import {SoporteComponent} from './components/soporte/soporte.component';
import {SeguimientosPerfilComponent} from './components/seguimientos-perfil/seguimientos-perfil.component';
import {GestionSeguimientosComponent} from './components/gestion-seguimientos/gestion-seguimientos.component';
import {ReportesComponent} from './components/reportes/reportes.component';


const role = JSON.parse(localStorage.getItem("perfil"))
const Route = '/Seguimientos-listar'
const Route2 = '/Seguimientos'
var redireccionar
if(role == '3' || role == '4' || role == '5' || role == '6'){
  redireccionar = Route2
}else{
  redireccionar = Route
}

const routes: Routes = [
  { path: '', redirectTo: redireccionar, pathMatch: 'full' },
  { path: 'Seguimientos-listar', component: SeguimientosListarComponent, canActivate: [AuthGuard]},
  { path: 'Seguimientos', component: SeguimientosPerfilComponent, canActivate: [AuthGuard]},
  { path: 'Usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
  { path: 'Soporte/:id', component: SoporteComponent, canActivate: [AuthGuard]},
  { path: 'gestion-seguimientos/:id', component: GestionSeguimientosComponent, canActivate: [AuthGuard]},
  { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard]},
  { path: 'Login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy',useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
