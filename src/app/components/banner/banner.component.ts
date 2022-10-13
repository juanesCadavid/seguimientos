import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Login } from 'src/app/Model/login';
import {LoginService} from '../../services/login/login.service';
import {UsuarioService} from '../../services/usuario/usuario.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  today: number = Date.now();
  cargar
  usuario
  datosUsuario
  activo: string = 'none';
  desplegar() {
    if (this.activo == 'none') {
      this.activo = 'block';
    } else {
      if (this.activo == 'block') {
        this.activo = 'none';
      }
    }
  }

  constructor(private UsuarioService:UsuarioService,private loginservice: LoginService, private ngxSpinnerService: NgxUiLoaderService,) { 
    let user_string = localStorage.getItem('currentUser');
    this.usuario = JSON.parse(user_string);
  }

  ngOnInit(): void {
    this.recargarHora();
    this.cargarDatosUsuarios();
  }

  recargarHora() {
    this.cargar = interval(9000);
    this.cargar.subscribe(() => {
      this.today = Date.now();
    })
  }

  ngOnDestroy() {
  
  }

  cargarDatosUsuarios(){
    this.UsuarioService.cargarDatosUsuario(this.usuario).subscribe(res=>{
      this.datosUsuario = res;
    })
  }

  logout() {
    this.ngxSpinnerService.start();
    this.loginservice.logoutUser()
    this.ngxSpinnerService.stop();
  }
  
}
