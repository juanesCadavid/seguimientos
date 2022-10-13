import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import keys from '../../../Keys'
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URI = keys.api.API_URI + '/login';
  headers: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private httpClient: HttpClient, private router: Router) { }

  loginUser(USUARIO: string, Contrasena: any): Observable<any> {
    return this.httpClient.post(`${this.API_URI}`, { USUARIO, Contrasena });
  };

  setUser(user: string, token: string) {
    user = JSON.stringify(user)
    localStorage.setItem("access_token", token);
    localStorage.setItem("currentUser", user);
  };

  public logoutUser() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('accestoken')
    localStorage.removeItem('access_token');
    localStorage.removeItem('perfil');
    this.router.navigateByUrl('/Login');
  }

   logout2() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accestoken');
    localStorage.removeItem('access_token');
    localStorage.removeItem('perfil');
    // this.router.navigate(['/Login']);
    window.location.reload();
  }

  getCurrentperfil() {
    let perfil_string = localStorage.getItem('perfil');
    if (perfil_string) {
      let user = JSON.parse(perfil_string);
      return user;
    } else {
      return null
    }

  }

  getCurrentUser() {
    let user_string = localStorage.getItem('currentUser');
    if (user_string) {
      let user = JSON.parse(user_string);
      return user;
    } else {
      return null
    }

  }

  public get isloggedIn(): boolean {
    let logued = localStorage.getItem('access_token')
    if (logued) {
      return true
    } else {
      return false;
    }
  }

  public get isAdminD(): boolean {
    let logued = JSON.parse(localStorage.getItem('perfil'))
    if (logued == '1') {
      return true
    } else {
      return false;
    }
  }

  public get isAdminJ(): boolean {
    let logued = JSON.parse(localStorage.getItem('perfil'))
    if (logued == '2') {
      return true
    } else {
      return false;
    }
  }

  public get isAdmin(): boolean {
    let logued = JSON.parse(localStorage.getItem('perfil'))
    if (logued == '7') {
      return true
    } else {
      return false;
    }
  }

  public get isAnalistas(): boolean {
    let logued = JSON.parse(localStorage.getItem('perfil'))
    if (logued == '3') {
      return true
    } else {
      return false;
    }
  }

  public get isSoporte(): boolean {
    let logued = JSON.parse(localStorage.getItem('perfil'))
    if (logued == '4') {
      return true
    } else {
      return false;
    }
  }

  public get isDesarrollo(): boolean {
    let logued = JSON.parse(localStorage.getItem('perfil'))
    if (logued == '5') {
      return true
    } else {
      return false;
    }
  }

  public get isCoorSoporte(): boolean {
    let logued = JSON.parse(localStorage.getItem('perfil'))
    if (logued == '6') {
      return true
    } else {
      return false;
    }
  }



}
