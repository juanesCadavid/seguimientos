import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import keys from '../../../Keys'
import { Registro } from 'src/app/Model/registro';
import { Usuario } from 'src/app/Model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URI = keys.api.API_URI + '/registrar';
  constructor(private http: HttpClient) { }

  cargarDatosUsuario(usuario){
    return this.http.get(`${this.API_URI}/${usuario}`)
  }

  registrarUsuario(registro: Registro) {
    return this.http.post(`${this.API_URI}/registrar`, registro)
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URI}/usuario`, usuario)
  }

  cargarDatos(){
    return this.http.get(`${this.API_URI}/listar/usuario`)
  }

  cargarResponsableSeguimiento(ID_PERFIL){
    return this.http.get(`${this.API_URI}/responsable/${ID_PERFIL}`)
  }

  cargarResponsableSeguimientoGest(){
    return this.http.get(`${this.API_URI}/listar/responsable`)
  }
  actualizarResgistro(dato,ID){
    return this.http.put(`${this.API_URI}/usuario/${ID}`,dato)
  }
  
  eliminarUsuario(usuario){
    return this.http.delete(`${this.API_URI}/usuario/${usuario}`)
  }

  eliminarRegistro(registro){
    return this.http.delete(`${this.API_URI}/registro/${registro}`)
  }

  cargarPerfil(registro){
    return this.http.get(`${this.API_URI}/perfil/${registro}`)
  }

  resetContraseña(newDatos) {
    return this.http.post(`${this.API_URI}/rcontrasena`, newDatos)
  }

  cambiarContrasena(newDatos,USUARIO,Contrasena){
   const newDatos2 = {newDatos,USUARIO,Contrasena}
    return this.http.post(`${this.API_URI}/cContrasena/user`, newDatos2)
  }

  cargarUsuario(ID_REGISTRO){
    return this.http.get(`${this.API_URI}/usuario/${ID_REGISTRO}`)
  }


}
