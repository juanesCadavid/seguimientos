import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Seguimiento } from '../../Model/seguimiento';
import { ListacomboseguimientoService } from '../../services/listacomboseguimiento/listacomboseguimiento.service';
import { SeguimientosService } from '../../services/seguimientos/seguimientos.service';
import { GestionSeguimientosService } from '../../services/gestion-seguimientos/gestion-seguimientos.service'
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ReportesService } from '../../services/reportes/reportes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver'
import { LoginService } from 'src/app/services/login/login.service';
var moment = require('moment');


@Component({
  selector: 'app-seguimientos-listar',
  templateUrl: './seguimientos-listar.component.html',
  styleUrls: ['./seguimientos-listar.component.css']
})
export class SeguimientosListarComponent implements OnInit {

  epsFiltro = 'fas fa-sort-down'
  requerimientoFiltro = 'fas fa-sort-down'
  estadoFiltro = 'fas fa-sort-down'
  fechaFinFiltro = 'fas fa-sort-down'
  responsableFiltro = 'fas fa-sort-down'
  tituloRequerimientoFiltro = 'fas fa-sort-down'

  exportar
  medio
  isReadonly = false;
  tipoRequerimiento
  categoria
  resultado
  totalRecords
  responsableseguimiento
  responsableseguimiento2
  responsableseguimientofilt
  responsable
  cargaseguimiento
  editSeguimiento
  seguimiento2
  prestador
  rows = 10;
  page = 0;
  EPS = ''
  TITULO_REQUERIMIENTO = ''

  static EPS = ''
  static TIPO_REQUERIMIENTO = '';
  static FECHA_FINALIZACION = '';
  static ESTADO = ''
  static ID_REGISTRO = '';
  static TITULO_REQUERIMIENTO = '';

  set staticEPS(aaa) {
    SeguimientosListarComponent.EPS = aaa;
  }
  set staticTIPO_REQUERIMIENTO(aaa) {
    SeguimientosListarComponent.TIPO_REQUERIMIENTO = aaa;
  }
  set staticESTADO(aaa) {
    SeguimientosListarComponent.ESTADO = aaa;
  }
  set staticFECHA_FINALIZACION(aaa) {
    SeguimientosListarComponent.FECHA_FINALIZACION = aaa;
  }
  set staticID_REGISTRO(aaa) {
    SeguimientosListarComponent.ID_REGISTRO = aaa;
  }

  set stataticTITULO_REQUERIMIENTO(aaa) {
    SeguimientosListarComponent.TITULO_REQUERIMIENTO = aaa;
  }


  fechaEntregaAux = true;
  areaAux = true;
  descripcionAux = true;

  ID_REGISTRO = '';
  ID_REGISTRO1
  TIPO_REQUERIMIENTO = '';
  FECHA_FINALIZACION = '';
  ESTADO = ''
  usuario
  reporte
  perfil
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
    private reporteService: ReportesService) {
    this.usuario = this.loginservice.getCurrentUser()
  }

  ngOnInit(): void {
    this.opcionesListas();
  }

  opcionesListas() {
    this.CargarSeguimientos();
    this.cargarmedio();
    this.cargarTipoRequerimiento();
    this.cargarCategoría();
    this.cargarResponsableSeguimiento();
    this.numerodeRegistros();
    this.cargarPrestador();
    this.cargarReporteCasosPerfil();
    this.cargarperfil();
    this.cargarResponsableSeguimientoFil();
  }

  CargarSeguimientos() {
    this.seguimintoService.cargarTodos(this.page, this.rows,SeguimientosListarComponent.EPS, SeguimientosListarComponent.TIPO_REQUERIMIENTO, SeguimientosListarComponent.ESTADO, SeguimientosListarComponent.FECHA_FINALIZACION, SeguimientosListarComponent.ID_REGISTRO, SeguimientosListarComponent.TITULO_REQUERIMIENTO).subscribe(res => {
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

  cargarPrestador() {
    this.listaComboSeguimientoService.cargarPrestador().subscribe(res => {
      this.prestador = res;
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

  cargarReporteCasosPerfil() {
    let perfil = this.loginservice.getCurrentperfil()
    this.reporteService.cargarReporteCasosPorPerfil(perfil).subscribe(res => {
      this.reporte = res;
    })
  }


  cargarResponsableSeguimientoFil() {
    this.usuarioService.cargarResponsableSeguimientoGest().subscribe(res => {
      this.responsableseguimientofilt = res;
    })
  }

  cargarReporteCasosUsuarios(){
    let perfil;
    let ID_REGISTRO = SeguimientosListarComponent.ID_REGISTRO
     this.usuarioService.cargarPerfil(SeguimientosListarComponent.ID_REGISTRO).subscribe(res=>{
     perfil = res;
      for (let index = 0; index < perfil.length; index++) {
        const element = perfil[index];
        if(ID_REGISTRO == element.ID_REGISTRO){
          this.reporteService.cargarReportePorUsuarios(element.ID_PERFIL,ID_REGISTRO).subscribe(res=>{
            this.reporte = res;
          })
        }
      }
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

    // if(this.seguimiento2.FECHA_FINALIZACION != ""){
    //   this.isReadonly = true;
    // }else{
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
            this.nuevo();
            this.CargarSeguimientos();
            this.modalService.dismissAll();
          }
        })
      })
    }

  }

  editarSeguimiento() {
    delete this.seguimiento2.FECHA_REQUERIMIENTO;
    delete this.seguimiento2.Nombres;
    delete this.seguimiento2.Apellidos;
    if (this.seguimiento2.FECHA_FINALIZACION != "") {
      this.seguimiento2.ESTADO = 'Realizado'
      this.isReadonly = true;
    }
    this.seguimintoService.ActualizarDatos(this.seguimiento2.ID_SEGUIMIENTOS, this.seguimiento2).subscribe(res => {
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

  cargarResponsableSeguimientoasig(ID_PERFIL) {
    this.usuarioService.cargarResponsableSeguimiento(ID_PERFIL).subscribe(res => {
      this.responsableseguimiento2 = res;
      console.log(this.responsableseguimiento2)
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

  fechaFinalizacion(content7) {
    this.modalService.open(content7, { size: 'sm', centered: true });
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
    SeguimientosListarComponent.EPS = '';
    SeguimientosListarComponent.ID_REGISTRO = '';
    SeguimientosListarComponent.TIPO_REQUERIMIENTO = '';
    SeguimientosListarComponent.ESTADO = '';
    SeguimientosListarComponent.FECHA_FINALIZACION = '';
    SeguimientosListarComponent.TITULO_REQUERIMIENTO = '';
    this.CargarSeguimientos();
    this.cargarReporteCasosPerfil();
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

    if (SeguimientosListarComponent.EPS == '') {
      this.epsFiltro = 'fas fa-sort-down'
    } else {
      this.epsFiltro = 'fas fa-filter'
    }
    if (SeguimientosListarComponent.ID_REGISTRO == '') {
      this.responsableFiltro = 'fas fa-sort-down'
    } else {
      this.responsableFiltro = 'fas fa-filter'
    }
    if (SeguimientosListarComponent.TIPO_REQUERIMIENTO == '') {
      this.requerimientoFiltro = 'fas fa-sort-down'
    } else {
      this.requerimientoFiltro = 'fas fa-filter'
    }
    if (SeguimientosListarComponent.ESTADO == '') {
      this.estadoFiltro = 'fas fa-sort-down'
    } else {
      this.estadoFiltro = 'fas fa-filter'
    }
    if (SeguimientosListarComponent.FECHA_FINALIZACION == '') {
      this.fechaFinFiltro = 'fas fa-sort-down'
    } else {
      this.fechaFinFiltro = 'fas fa-filter'
    }
    if (SeguimientosListarComponent.TITULO_REQUERIMIENTO == '') {
      this.tituloRequerimientoFiltro = 'fas fa-sort-down'
    } else {
      this.tituloRequerimientoFiltro = 'fas fa-filter'
    }
  }

  ExportarSeguimiento(){
    this.seguimintoService.exportarSeguimientos(SeguimientosListarComponent.EPS, SeguimientosListarComponent.TIPO_REQUERIMIENTO, SeguimientosListarComponent.ESTADO, SeguimientosListarComponent.FECHA_FINALIZACION, SeguimientosListarComponent.ID_REGISTRO).subscribe(res=>{
      this.exportar = res;
    })
  }

  exportExcel() {
    this.ExportarSeguimiento();
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.exportar);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "Seguimientos");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      saveAs(
        data,
        fileName + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
}