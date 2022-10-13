import { Component, OnInit } from '@angular/core';
import { ListacomboseguimientoService } from 'src/app/services/listacomboseguimiento/listacomboseguimiento.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ReportesService } from '../../services/reportes/reportes.service'
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  desarrollo;
  analista
  soporte
  adminD
  adminJ
  responsableseguimientoAnalist
  responsableseguimientoDesa
  responsableseguimientoSoport
  responsableseguimientoAdminD
  responsableseguimientoAdminJ
  responsableseguimientoCoorsopor
  coorSoporte
  perfil
  ID_REGISTRO = '';
  ID_REGISTROANALISTA = '';
  ID_REGISTROSOPORTE= '';
  view: [number, number] = [370, 290];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Estados';
  showYAxisLabel = true;
  yAxisLabel = 'Total casos';
  legendTitle = 'Estados'
  customColors = [
    { name: 'Realizados', value: '#b0e4e2' },
    { name: 'Pendientes', value: '#f2ce9e' },
    { name: 'En proceso', value: '#d3c8f2' }
  ];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private reportesService: ReportesService, private usuarioService: UsuarioService, private listaComboSeguimientoService: ListacomboseguimientoService) {

  }

  onSelect(event) {
  }

  ngOnInit(): void {
    this.cargarReporteDesarrollo();
    this.cargarReporteAnalistas();
    this.cargarReporteSoporte();
    this.cargarReporteAdminJ();
    this.cargarReporteAdminD();
    this.cargarReporteCoorSoporte();
    this.cargarperfil();
  }

  cargarperfil() {
    this.listaComboSeguimientoService.cargarPerfil().subscribe(res => {
      let desarrollo = res[4].ID_PERFIL;
      let analistas = res[2].ID_PERFIL;
      let soporte = res[3].ID_PERFIL;
  
      this.cargarResponsableSeguimientoDesarrollo(desarrollo)
      this.cargarResponsableSeguimientoAnalista(analistas)
      this.cargarResponsableSeguimientoSoporte(soporte)
    })
  }

  cargarResponsableSeguimientoDesarrollo(ID_PERFIL) {
    this.usuarioService.cargarResponsableSeguimiento(ID_PERFIL).subscribe(res => {
      this.responsableseguimientoDesa = res;
    })
  }

  cargarResponsableSeguimientoAnalista(ID_PERFIL) {
    this.usuarioService.cargarResponsableSeguimiento(ID_PERFIL).subscribe(res => {
      this.responsableseguimientoAnalist = res;
    })
  }

  cargarResponsableSeguimientoSoporte(ID_PERFIL) {
    this.usuarioService.cargarResponsableSeguimiento(ID_PERFIL).subscribe(res => {
      this.responsableseguimientoSoport = res;
    })
  }


  cargarReporteDesarrollo() {
    this.reportesService.cargarReportePerfilDesarrollo(this.ID_REGISTRO).subscribe(res => {
      var single = [
        {
          "name": "Realizados",
          "value": res[0].Realizados
        },
        {
          "name": "Pendientes",
          "value": res[0].Pendientes
        },
        {
          "name": "En proceso",
          "value": res[0].Proceso
        }
      ];
      this.desarrollo = single;
    })
  }

  cargarReporteAnalistas() {
    this.reportesService.cargarReportePerfilAnalista(this.ID_REGISTROANALISTA).subscribe(res => {
      var single = [
        {
          "name": "Realizados",
          "value": res[0].Realizados
        },
        {
          "name": "Pendientes",
          "value": res[0].Pendientes
        },
        {
          "name": "En proceso",
          "value": res[0].Proceso
        }
      ];
      this.analista = single;
    })
  }

  cargarReporteSoporte() {
    this.reportesService.cargarReportePerfilSoporte(this.ID_REGISTROSOPORTE).subscribe(res => {
      var single = [
        {
          "name": "Realizados",
          "value": res[0].Realizados
        },
        {
          "name": "Pendientes",
          "value": res[0].Pendientes
        },
        {
          "name": "En proceso",
          "value": res[0].Proceso
        }
      ];
      this.soporte = single;
     
    })
  }

  cargarReporteAdminD() {
    this.reportesService.cargarReportePerfilAdminD().subscribe(res => {
      var single = [
        {
          "name": "Realizados",
          "value": res[0].Realizados
        },
        {
          "name": "Pendientes",
          "value": res[0].Pendientes
        },
        {
          "name": "En proceso",
          "value": res[0].Proceso
        }
      ];
      this.adminD = single;
    })
  }

  cargarReporteAdminJ() {
    this.reportesService.cargarReportePerfilAdminJ().subscribe(res => {
      var single = [
        {
          "name": "Realizados",
          "value": res[0].Realizados
        },
        {
          "name": "Pendientes",
          "value": res[0].Pendientes
        },
        {
          "name": "En proceso",
          "value": res[0].Proceso
        }
      ];
      this.adminJ = single;
    })
  }

  cargarReporteCoorSoporte() {
    this.reportesService.cargarReportePerfilCoorSoporte().subscribe(res => {
      var single = [
        {
          "name": "Realizados",
          "value": res[0].Realizados
        },
        {
          "name": "Pendientes",
          "value": res[0].Pendientes
        },
        {
          "name": "En proceso",
          "value": res[0].Proceso
        }
      ];
      this.coorSoporte = single;
    })
  }

}
