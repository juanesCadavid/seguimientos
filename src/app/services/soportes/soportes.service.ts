import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import keys from '../../../Keys'
@Injectable({
  providedIn: 'root'
})
export class SoportesService {
  API_URI = keys.api.API_URI + '/soportes';
  constructor(private http:HttpClient) { }

  Guardarsoporte(nombre_archivo:string,tipo_archivo:string, usuario_creacion:string, ID_GESTION_SEGUIMIENTO:string, soporte:File){
    const fd = new FormData();
    fd.append('nombre_archivo',nombre_archivo);
    fd.append('tipo_archivo',tipo_archivo);
    fd.append('usuario_creacion',usuario_creacion );
    fd.append('ID_GESTION_SEGUIMIENTO',ID_GESTION_SEGUIMIENTO);
    fd.append('soporte', soporte)
    return  this.http.post(`${this.API_URI}`, fd );

   }
   Cargarsoportes(nombreArchivo,tipoArchivo,ID_GESTION_SEGUIMIENTO,page, row){
    const cargar = {nombreArchivo,tipoArchivo,ID_GESTION_SEGUIMIENTO,page, row}
   return this.http.post(`${this.API_URI}/soporte`,cargar)
  }
}
