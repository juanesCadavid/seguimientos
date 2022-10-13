import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginservice: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let authorization = this.loginservice.isloggedIn;
    const privileges = route.data['canAccess'];
    if (privileges) {
      authorization = authorization && this.hasPrivilege(privileges);
    }
    if (authorization) {
      return true;
    } else {
      this.router.navigateByUrl('Login')
      return false;
    }
  }


  /*
** Este metodo se usa para saber si un perfil tiene privilegio para usar determinada ruta
*/
  private hasPrivilege(privileges: any): boolean {
    let user = this.loginservice.getCurrentUser()
    let canaccess = false
    for (let priv of privileges) {
      if (user.ProfileName == priv) {
        canaccess = true
        break
      }
    }
    return canaccess
  }
}
