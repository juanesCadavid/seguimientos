import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Seguimiento } from '../../Model/seguimiento';
import { ListacomboseguimientoService } from '../../services/listacomboseguimiento/listacomboseguimiento.service';
import { SeguimientosService } from '../../services/seguimientos/seguimientos.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { GestionSeguimientosService } from '../../services/gestion-seguimientos/gestion-seguimientos.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
var moment = require('moment');

@Component({
  selector: 'app-seguimientos-perfil',
  templateUrl: './seguimientos-perfil.component.html',
  styleUrls: ['./seguimientos-perfil.component.css']
})
export class SeguimientosPerfilComponent implements OnInit {

  medio
  private ID_PERFIL;
  isReadonly = false;
  tipoRequerimiento
  categoria
  resultado
  prestador
  totalRecords
  responsableseguimiento
  responsableseguimiento2
  cargaseguimiento
  editSeguimiento
  seguimiento2
  responsable
  ID_REGISTRO1
  rows = 10;
  page = 0;
  EPS = ''
  usuario
  reporte
  perfil
  ID_SEGUIMIENTO = ''
  ID_REGISTRO = ''
  TIPO_REQUERIMIENTO = ''
  ESTADO = ''
  TITULOREQUERIMIENTO = ''

  fechaEntregaAux = true;
  areaAux = true;
  descripcionAux = true;

  epsFiltro = 'fas fa-sort-down'
  requerimientoFiltro = 'fas fa-sort-down'
  estadoFiltro = 'fas fa-sort-down'
  fechaFinFiltro = 'fas fa-sort-down'
  responsableFiltro = 'fas fa-sort-down'
  tituloRequerimientoFiltro = 'fas fa-sort-down'

  
  static EPS = ''
  static TIPO_REQUERIMIENTO = '';
  static FECHA_FINALIZACION = '';
  static ESTADO = ''
  static ID_REGISTRO = '';
  static TITULOREQUERIMIENTO = '';
  static ID_SEGUIMIENTO = '';

  set staticEPS(aaa) {
    SeguimientosPerfilComponent.EPS = aaa;
  }
  set staticTIPO_REQUERIMIENTO(aaa) {
    SeguimientosPerfilComponent.TIPO_REQUERIMIENTO = aaa;
  }
  set staticESTADO(aaa) {
    SeguimientosPerfilComponent.ESTADO = aaa;
  }
  set staticFECHA_FINALIZACION(aaa) {
    SeguimientosPerfilComponent.FECHA_FINALIZACION = aaa;
  }
  set staticID_REGISTRO(aaa) {
    SeguimientosPerfilComponent.ID_REGISTRO = aaa;
  }

  set staticTITULO_REQUERIMIENTO(aaa) {
    SeguimientosPerfilComponent.TITULOREQUERIMIENTO = aaa;
  }


  seguimiento: Seguimiento = {
    ID_SEGUIMIENTOS: 0,
    EPS: '',
    FECHA_REQUERIMIENTO: '',
    MEDIO: '',
    TIPO_REQUERIMIENTO: '',
    TITULO_REQUERIMIENTO: '',
    DESCRIPCION_REQUERIMIENTO: '',
    AREA_VALIDACION: '',
    ESTADO: '',
    FECHA_ENTREGA: '',
    FECHA_FINALIZACION: '',
    SEGUIMIENTO: '',
    ID_REGISTRO: '',
    RUTA_SOPORTES: '',
    Categoria: '',
    USUARIO_CREACION: '',
    ID_PERFIL: '',
    Dias_Entrega: ''
  }
  constructor(private modalService: NgbModal, private seguimintoService: SeguimientosService, private listaComboSeguimientoService: ListacomboseguimientoService,
    private usuarioService: UsuarioService, private router: Router, private gestionSeguimientoService: GestionSeguimientosService, private loginservice: LoginService,
    private reporteService: ReportesService) { this.ID_PERFIL = JSON.parse(localStorage.getItem('perfil'), this.usuario = this.loginservice.getCurrentUser()) }

  ngOnInit(): void {
    this.opcionesListas();
  }

  opcionesListas() {
    this.CargarSeguimientos();
    this.cargarmedio();
    this.cargarTipoRequerimiento();
    this.cargarCategoría();
    this.numerodeRegistros();
    this.cargarPrestador();
    this.cargarReporteCasosPerfil();
    this.cargarperfil();
  }

  CargarSeguimientos() {
    this.seguimintoService.cargarSeguimientoPerfil(this.ID_PERFIL, this.usuario, this.page, this.rows, SeguimientosPerfilComponent.EPS, SeguimientosPerfilComponent.TIPO_REQUERIMIENTO, SeguimientosPerfilComponent.ESTADO, SeguimientosPerfilComponent.ID_SEGUIMIENTO, SeguimientosPerfilComponent.TITULOREQUERIMIENTO).subscribe(res => {
      this.cargaseguimiento = res;
      this.hayFiltro();
    })
  }
  numerodeRegistros() {
    this.seguimintoService.numerodeRegistros().subscribe(res => {
      this.totalRecords = res;
    })
  }

  paginador(event) {
    this.rows = event.rows;
    this.page = event.page;
    this.CargarSeguimientos();
  }

  cargarmedio() {
    this.listaComboSeguimientoService.cargarMedio().subscribe(res => {
      this.medio = res;
    })
  }

  cargarTipoRequerimiento() {
    this.listaComboSeguimientoService.cargarTipoRequerimiento().subscribe(res => {
      this.tipoRequerimiento = res;
    })
  }

  cargarCategoría() {
    this.listaComboSeguimientoService.cargarCategoria().subscribe(res => {
      this.categoria = res;
    })
  }

  cargarperfil() {
    this.listaComboSeguimientoService.cargarPerfil().subscribe(res => {
      this.perfil = res;
    })
  }

  cargarResponsableSeguimiento() {
    this.usuarioService.cargarResponsableSeguimiento(this.seguimiento.ID_PERFIL).subscribe(res => {
      this.responsableseguimiento = res;
    })
  }

  cargarPrestador() {
    this.listaComboSeguimientoService.cargarPrestador().subscribe(res => {
      this.prestador = res;
    })
  }





  cargarReporteCasosPerfil() {
    let perfil = this.loginservice.getCurrentperfil()
    this.reporteService.cargarReporteCasosPorPerfil(perfil).subscribe(res => {
      this.reporte = res;
    })
  }

  onRowSelect(event, content) {
    this.seguimiento2 = event.data;
    this.gestionSeguimientoService.consultarSeguimientosOBS(this.seguimiento2)
    if (this.seguimiento2.Nombres == null && this.seguimiento2.Apellidos == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Debe asignar un responsable ",
        showConfirmButton: true,
        allowOutsideClick: false, // NO PERMITE QUE SE CIERRE AL DAR CLIC POR FUERA
      })
    } else {
      this.router.navigate(['/gestion-seguimientos/', this.seguimiento2.ID_SEGUIMIENTOS]);
    }
    // if (this.seguimiento2.FECHA_FINALIZACION != "") {
    //   this.isReadonly = true;
    // } else {
    //   this.isReadonly = false;
    // }
    // this.open(content)
  }


  guardarDatos() {
    let entro = false;
    if (this.seguimiento.FECHA_ENTREGA == '') {
      this.fechaEntregaAux = false;
      entro = true;
    } else {
      this.fechaEntregaAux = true;
    }
    if (this.seguimiento.ID_PERFIL == '') {
      this.areaAux = false;
      entro = true;
    } else {
      this.areaAux = true;
    }
    // if (this.seguimiento.DESCRIPCION_REQUERIMIENTO == '') {
    //   this.descripcionAux = false;
    //   entro = true;
    // } else {
    //   this.descripcionAux = true;
    // }
    if (entro == true) {
      Swal.fire({
        icon: 'error',
        title: '¡Advertencia!',
        text: 'Digite los campos obligatorios',
      })
    } else {
      delete this.seguimiento.ID_SEGUIMIENTOS;
      delete this.seguimiento.FECHA_REQUERIMIENTO;
      if (this.seguimiento.ID_REGISTRO == '') {
        this.seguimiento.ESTADO = 'Sin asignar';
      } else {
        this.seguimiento.ESTADO = 'Pendiente';
      }
      this.seguimiento.USUARIO_CREACION = this.usuario;

      this.seguimintoService.guardarSeguimiento(this.seguimiento).subscribe(res => {
        Swal.fire({
          title: 'Almacenado!',
          text: 'Datos almacenados con exito.',
          icon: 'success',
          allowOutsideClick: false
        }

        ).then((result) => {
          if (result.value) {
            this.CargarSeguimientos();
            this.nuevo();
            this.modalService.dismissAll();
          }
        })
      })
    }

  }

  editarSeguimiento() {
    delete this.seguimiento2.FECHA_REQUERIMIENTO;
    if (this.seguimiento2.FECHA_FINALIZACION != "") {
      this.seguimiento2.ESTADO = 'Realizado'
      this.isReadonly = true;
    }
    this.seguimintoService.ActualizarDatos(this.seguimiento2.ID_SEGUIMIENTOS, this.seguimiento2).subscribe(res => {
      Swal.fire({
        title: 'Actualizado!',
        text: 'Datos actualizados con exito.',
        icon: 'success',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          this.CargarSeguimientos();
        }
      })
    })
  }

  cargarResponsableSeguimientoasig(ID_PERFIL) {
    this.usuarioService.cargarResponsableSeguimiento(ID_PERFIL).subscribe(res => {
      this.responsableseguimiento2 = res;
    })
  }

  formulario(content5) {
    this.modalService.open(content5, { size: 'lg', scrollable: true });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  filtroEps(content1) {
    this.modalService.open(content1, { size: 'sm', centered: true });
  }

  filtroTiporequerimiento(content2) {
    this.modalService.open(content2, { size: 'sm', centered: true });
  }

  filtroEstado(content4) {
    this.modalService.open(content4, { size: 'sm', centered: true });
  }

  filtroResponsable(content5) {
    this.modalService.open(content5, { size: 'sm', centered: true });
  }

  tituloRequerimiento(content8) {
    this.modalService.open(content8, { size: 'sm', centered: true });
  }

  asignarResponsabl(content6, data) {
    this.responsable = data
    this.cargarResponsableSeguimientoasig(data.ID_PERFIL);
    if (this.responsable.FECHA_FINALIZACION != "") {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Este caso ya se encuentra cerrado",
        showConfirmButton: true,
        allowOutsideClick: false, // NO PERMITE QUE SE CIERRE AL DAR CLIC POR FUERA
      })
    } else {
      this.modalService.open(content6, { size: 'sm', centered: true });
    }

  }

  asignarResponsable() {
    delete this.responsable.FECHA_REQUERIMIENTO;
    delete this.responsable.Nombres;
    delete this.responsable.Apellidos;
    delete this.responsable.Area;
    this.responsable.ID_REGISTRO = this.ID_REGISTRO1;
    this.responsable.ESTADO = 'Pendiente'
    this.isReadonly = true;
    this.seguimintoService.ActualizarDatos(this.responsable.ID_SEGUIMIENTOS, this.responsable).subscribe(res => {
      console.log(res);
      Swal.fire({
        title: 'Actualizado!',
        text: 'Datos actualizados con exito.',
        icon: 'success',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          this.CargarSeguimientos();
        }
      })
    })
  }

  limpiarFiltros() {
    SeguimientosPerfilComponent.EPS = '';
    SeguimientosPerfilComponent.ID_REGISTRO = '';
    SeguimientosPerfilComponent.TIPO_REQUERIMIENTO = '';
    SeguimientosPerfilComponent.ESTADO = '';
    SeguimientosPerfilComponent.TITULOREQUERIMIENTO = '';
    this.CargarSeguimientos();
    this.hayFiltro();
  }

  nuevo() {
    this.seguimiento = {
      ID_SEGUIMIENTOS: 0,
      EPS: '',
      FECHA_REQUERIMIENTO: '',
      MEDIO: '',
      TIPO_REQUERIMIENTO: '',
      TITULO_REQUERIMIENTO: '',
      DESCRIPCION_REQUERIMIENTO: '',
      AREA_VALIDACION: '',
      ESTADO: '',
      FECHA_ENTREGA: '',
      FECHA_FINALIZACION: '',
      SEGUIMIENTO: '',
      ID_REGISTRO: '',
      RUTA_SOPORTES: '',
      Categoria: '',
      USUARIO_CREACION: ''
    }
  }

  validacionFecha(fecha) {
    var startDate =  new Date(fecha)
    let startDate1  = (startDate.getFullYear()) + '-' + (startDate.getMonth() + 1) + '-' + (startDate.getDate() + 1)
    var today = moment(new Date()).format('YYYY-MM-DD')
    if (startDate1 < today) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la fecha',
        text: 'la Fecha de entrega debe ser mayor o igual a la fecha actual',
      })
      this.seguimiento.FECHA_ENTREGA = '';
    }
  }

  aprobarFecha(dato) {
    if (dato != '') {
      this.fechaEntregaAux = true;
    }
  }
  // aprobarDes(dato) {
  //   if (dato != '') {
  //     this.descripcionAux = true;
  //   }
  // }
  aprobarArea(dato) {
    if (dato != '') {
      this.areaAux = true;
    }
  }

  hayFiltro() {

    if (SeguimientosPerfilComponent.EPS == '') {
      this.epsFiltro = 'fas fa-sort-down'
    } else {
      this.epsFiltro = 'fas fa-filter'
    }
    if (SeguimientosPerfilComponent.ID_REGISTRO == '') {
      this.responsableFiltro = 'fas fa-sort-down'
    } else {
      this.responsableFiltro = 'fas fa-filter'
    }
    if (SeguimientosPerfilComponent.TIPO_REQUERIMIENTO == '') {
      this.requerimientoFiltro = 'fas fa-sort-down'
    } else {
      this.requerimientoFiltro = 'fas fa-filter'
    }
    if (SeguimientosPerfilComponent.ESTADO == '') {
      this.estadoFiltro = 'fas fa-sort-down'
    } else {
      this.estadoFiltro = 'fas fa-filter'
    }
    if (SeguimientosPerfilComponent.FECHA_FINALIZACION == '') {
      this.fechaFinFiltro = 'fas fa-sort-down'
    } else {
      this.fechaFinFiltro = 'fas fa-filter'
    }
    if (SeguimientosPerfilComponent.TITULOREQUERIMIENTO == '') {
      this.tituloRequerimientoFiltro = 'fas fa-sort-down'
    } else {
      this.tituloRequerimientoFiltro = 'fas fa-filter'
    }
  }


}
