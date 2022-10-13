import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import keys from '../../../Keys'

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  API_URI = keys.api.API_URI + '/reportes';

  constructor(private http: HttpClient) { }

  cargarReporteCasosPorPerfil(ID_PERFIL){
    return this.http.get(`${this.API_URI}/${ID_PERFIL}`)
  }

  
  cargarReportePorUsuarios(ID_PERFIL,ID_REGISTRO){
    const cargar = {ID_PERFIL,ID_REGISTRO }
    return this.http.post(`${this.API_URI}/reporte/usuarios`,cargar)
  }

  cargarReportePerfilDesarrollo(ID_REGISTRO){
    const cargar = {ID_REGISTRO }
    return this.http.post(`${this.API_URI}/desarrollo`,cargar)
  }

  cargarReportePerfilAnalista(ID_REGISTRO){
    const cargar = {ID_REGISTRO }
    return this.http.post(`${this.API_URI}/analista/analista`,cargar)
  }

  cargarReportePerfilSoporte(ID_REGISTRO){
    const cargar = {ID_REGISTRO }
    return this.http.post(`${this.API_URI}/soporte/soporte`,cargar)
  }

  cargarReportePerfilAdminD(){
    return this.http.get(`${this.API_URI}/adminD/adminD`)
  }

  cargarReportePerfilAdminJ(){
    return this.http.get(`${this.API_URI}/adminJ/adminJ`)
  }

  cargarReportePerfilCoorSoporte(){
    return this.http.get(`${this.API_URI}/coorSoporte/coorSoporte`)
  }

}
