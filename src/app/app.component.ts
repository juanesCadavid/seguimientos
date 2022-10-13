import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public loginService: LoginService,private ngxSpinnerService: NgxUiLoaderService,private rutaActiva: ActivatedRoute, private Router: Router,){}
  title = 'seguimientosProcex';

  logout() {
    this.ngxSpinnerService.start();
    this.loginService.logoutUser()
    this.ngxSpinnerService.stop();
  }
}


