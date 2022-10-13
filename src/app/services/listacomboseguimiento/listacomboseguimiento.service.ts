import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import keys from '../../../Keys'
@Injectable({
  providedIn: 'root'
})
export class ListacomboseguimientoService {
  API_URI = keys.api.API_URI + '/listacomboseguimiento';
  
  constructor(private http: HttpClient) { }

  cargarMedio(){
    return this.http.get(`${this.API_URI}/medio`)
  }

  cargarTipoRequerimiento(){
    return this.http.get(`${this.API_URI}/tipoR`)
  }

  cargarCategoria(){
    return this.http.get(`${this.API_URI}/categoria`)
  }

  cargarEstado(){
    return this.http.get(`${this.API_URI}/estado`)
  }

  cargarPerfil(){
    return this.http.get(`${this.API_URI}/perfil`)
  }

  cargarPrestador(){
    return this.http.get(`${this.API_URI}/prestador`)
  }

}
