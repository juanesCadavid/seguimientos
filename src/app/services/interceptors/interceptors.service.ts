import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../login/login.service'

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService implements HttpInterceptor {

  constructor(private router: Router, private loginservice: LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('access_token');
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(this.manejarError)

    )
  }

  manejarError(error: HttpErrorResponse) {
    if ([401, 403, 404].indexOf(error.status) !== -1) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('accestoken');
      localStorage.removeItem('access_token');
      window.location.reload();
    } else {
      console.log('Sucedio un error')
      console.log('Registrado en el log file')
      console.warn(error)
    }

    return throwError('Error personalizado')
  }


}
