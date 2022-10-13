import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login/login.service'
import { SoportesService } from '../../services/soportes/soportes.service'
import { Router } from '@angular/router';
import { saveAs } from 'file-saver'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.css']
})
export class SoporteComponent implements OnInit {
  Hemofilia: any
  nombre_archivo: string
  soporte: any
  tipo_archivo = '';
  private ID_GESTION_SEGUIMIENTO;
  usuario: string
  file: File;
  nombrearchivo: string
  Tipoarchivo = '';
  nombreArchivo = '';
  tipoArchivo = '';
  Anulado = '';
  rows = 10;
  page = 0;
  totalRecords
  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private loginservice: LoginService, activateRoute: ActivatedRoute,private SoporteService:SoportesService, private router: Router ) {
    config.backdrop = 'static';
    config.keyboard = false; this.usuario = this.loginservice.getCurrentUser(); this.ID_GESTION_SEGUIMIENTO = activateRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.cargarsoporte();
    this.cargarNumeroRegistros();
  }

  cargarsoporte() {
    this.SoporteService.Cargarsoportes(this.nombreArchivo, this.tipoArchivo,this.ID_GESTION_SEGUIMIENTO,this.page, this.rows).subscribe(res => {
      this.soporte = res;
    })
  }

  cargarNumeroRegistros() {
    // this.soporteservice.numeroRegistro(this.CC).subscribe(res => {
    //   this.totalRecords = res;
    // })
  }

  open(content: any) {
    this.modalService.open(content);
  }


  onphotoselected(event: any): void {
    this.file = event.target.files[0]
    this.nombrearchivo = event.target.files[0].name
    this.Guargarsoporte();
  }

  Guargarsoporte() {
    this.SoporteService.Guardarsoporte(this.nombrearchivo ,this.tipo_archivo, this.usuario, this.ID_GESTION_SEGUIMIENTO, this.file).subscribe(res => {
      console.log(res)
      Swal.fire({
        title: 'Almacenado!',
        text: 'Archivo cargado',
        icon: 'success',
        allowOutsideClick: false
      }
      ).then((result) => {
        if (result.value) {
          this.cargarsoporte();
          this.modalService.dismissAll();
        }
      })
    })
  }

  Descargarsoporte(ID_soporte: string) {
    for (let i = 0; i < this.soporte.length; i++) {
      if (ID_soporte == this.soporte[i].ID_soporte) {
        const ruta = 'http://147.182.179.68:3000/' + this.soporte[i].RUTA_SOPORTES
        saveAs(ruta,this.soporte[i].nombre_archivo)
      }
    }
  }

  redireccionar() {
    if (this.loginservice.isAnalistas || this.loginservice.isSoporte || this.loginservice.isDesarrollo) {
      this.router.navigate(['/Seguimientos']);
    }else{
      this.router.navigate(['/Seguimientos-listar']);
    }
  }
  
  paginador(event) {
    this.rows = event.rows;
    this.page = event.page;
    this.cargarsoporte();
  }

}
