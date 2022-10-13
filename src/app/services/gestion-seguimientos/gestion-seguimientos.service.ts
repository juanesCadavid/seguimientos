import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import keys from '../../../Keys'
import {GestionSeguimiento} from '../../Model/gestionSeguimiento'
import { Observable, BehaviorSubject,Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GestionSeguimientosService {
  
  API_URI = keys.api.API_URI + '/gestionseguimiento';
  private seguimientosSubject$ = new BehaviorSubject([]);
  private seguimientosCaso: any;
  constructor(private http: HttpClient) { }

  cargarGestion(ID_SEGUIMIENTOS) {
    return this.http.get(`${this.API_URI}/${ID_SEGUIMIENTOS}`)
  }

  guardarGestion(GestionSeguimiento:GestionSeguimiento){
    return this.http.post(`${this.API_URI}/`, GestionSeguimiento)
  }

  ActualizarDatos(ID_GESTION_SEGUIMIENTO, GestionSeguimiento:GestionSeguimiento) {
    return this.http.put(`${this.API_URI}/${ID_GESTION_SEGUIMIENTO}`, GestionSeguimiento)
  }

  getSeguimientos$(): Observable<any[]> {    
    return this.seguimientosSubject$.asObservable();
  }
  

  consultarSeguimientosOBS(seguimientoListar:any){
    this.seguimientosCaso = seguimientoListar;
    this.refreshp();
  }
  private refreshp() {
    // Emitir los nuevos valores para que los que dependan se actualicen
    this.seguimientosSubject$.next(this.seguimientosCaso)
   }
}
