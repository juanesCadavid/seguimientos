import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import keys from '../../../Keys'
import {Seguimiento} from '../../Model/seguimiento'
@Injectable({
  providedIn: 'root'
})
export class SeguimientosService {

  API_URI = keys.api.API_URI + '/seguimientos';

  constructor(private http: HttpClient) { }

  guardarSeguimiento(seguimiento:Seguimiento){
    return this.http.post(`${this.API_URI}/almacenar`, seguimiento)
  }

  cargarTodos(page,row,EPS, TIPO_REQUERIMIENTO, ESTADO, FECHA_FINALIZACION, ID_REGISTRO,TITULO_REQUERIMIENTO){
    const cargar = { page, row,EPS, TIPO_REQUERIMIENTO, ESTADO, FECHA_FINALIZACION, ID_REGISTRO,TITULO_REQUERIMIENTO }
    return this.http.post(`${this.API_URI}/`,cargar)
  }

  cargarSeguimientoPerfil(ID_PERFIL,USUARIO,page,row,EPS,TIPO_REQUERIMIENTO, ESTADO,ID_REGISTRO,TITULO_REQUERIMIENTO){
    const cargar = {ID_PERFIL,USUARIO, page, row,EPS,TIPO_REQUERIMIENTO, ESTADO,ID_REGISTRO,TITULO_REQUERIMIENTO }
    return this.http.post(`${this.API_URI}/seguimiento/perfil`,cargar)
    
  }

  numerodeRegistros(){
    return this.http.get(`${this.API_URI}/`)
  }

  ActualizarDatos(ID_SEGUIMIENTOS, seguimiento:Seguimiento) {
    return this.http.put(`${this.API_URI}/${ID_SEGUIMIENTOS}`, seguimiento)
  }

  cargarSeguimeiento(ID_SEGUIMIENTOS) {
    return this.http.get(`${this.API_URI}/${ID_SEGUIMIENTOS}`)
  }

  exportarSeguimientos(EPS, TIPO_REQUERIMIENTO, ESTADO, FECHA_FINALIZACION, ID_REGISTRO) {
    const cargar = {EPS, TIPO_REQUERIMIENTO, ESTADO, FECHA_FINALIZACION, ID_REGISTRO }
    return this.http.post(`${this.API_URI}//seguimientos/exportar`,cargar)
  }

}


