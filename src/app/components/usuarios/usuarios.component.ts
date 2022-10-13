import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/Model/registro';
import { Usuario } from 'src/app/Model/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ListacomboseguimientoService } from '../../services/listacomboseguimiento/listacomboseguimiento.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  err_cedula = true;
  err_nombres = true;
  err_apellidos = true;
  err_correo = true;
  err_perfil = true;
  err_usuario = true;
  err_contrasena = true;

  actualizarInfo
  perfil
  Usuario
  registro: Registro = {
    ID_REGISTRO: '',
    Nombres: '',
    Apellidos: '',
    Correo: '',
    Telefono: ''
  }

  usuario: Usuario = {
    ID_USUARIO: 0,
    ID_REGISTRO: '',
    ID_PERFIL: '',
    USUARIO: '',
    Contrasena: ''
  }

  constructor(private listacomboSeguimientoservice: ListacomboseguimientoService, private usuarioService: UsuarioService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarPerfil();
    this.caragarDatos();
  }

  cargarPerfil() {
    this.listacomboSeguimientoservice.cargarPerfil().subscribe(res => {
      this.perfil = res;
    })
  }

  caragarDatos() {
    this.usuarioService.cargarDatos().subscribe(res => {
      this.Usuario = res;
    })
  }

  registrar() {
    console.log(this.registro.ID_REGISTRO)
    let entro = false;
    let loEncontro
    if (this.registro.ID_REGISTRO == '' || this.registro.ID_REGISTRO == null) {
      this.err_cedula = false;
      entro = true;
    }

    if (this.registro.Nombres == '' || this.registro.Nombres == null) {
      this.err_nombres = false;
      entro = true;
    }

    if (this.registro.Apellidos == '' || this.registro.Apellidos == null) {
      this.err_apellidos = false;
      entro = true;
    }

    if (this.registro.Correo == '' || this.registro.Correo == null) {
      this.err_correo = false;
      entro = true;
    }

    if (this.usuario.ID_PERFIL == '' || this.usuario.ID_PERFIL == null) {
      this.err_perfil = false;
      entro = true;
    }

    if (this.usuario.USUARIO == '' || this.usuario.USUARIO == null) {
      this.err_usuario = false;
      entro = true;
    }
    if (this.usuario.Contrasena == '' || this.usuario.Contrasena == null) {
      this.err_contrasena = false;
      entro = true;
    }

    if (entro == true) {
      Swal.fire({
        icon: 'error',
        title: '¡Advertencia!',
        text: 'Digite los campos obligatorios',
      })
    } else {
      this.usuarioService.cargarUsuario(this.registro.ID_REGISTRO).subscribe(res => {
        loEncontro = res;
        if (loEncontro == null || loEncontro == '') {
          this.usuarioService.registrarUsuario(this.registro).subscribe(res => {
            this.crearNuevoUsuario();
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡Advertencia!',
            text: 'Ya hay un registro con el mismo numero de documento',
          })
        }
      })
    }
  }

  crearNuevoUsuario() {

    delete this.usuario.ID_USUARIO;
    this.usuario.ID_REGISTRO = this.registro.ID_REGISTRO;
    this.usuarioService.guardarUsuario(this.usuario).subscribe(res => {
      Swal.fire({
        title: 'Almacenado!',
        text: 'Datos almacenados con exito.',
        icon: 'success',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          this.caragarDatos();
        }
      })
    })
  }


  onRowSelect(event, modal) {
    this.actualizarInfo = event.data;
    this.modalService.open(modal, { size: 'lg' });
  }

  nuevo() {
    this.registro = {
      ID_REGISTRO: '',
      Nombres: '',
      Apellidos: '',
      Correo: '',
      Telefono: ''
    }
    this.usuario = {
      ID_USUARIO: 0,
      ID_REGISTRO: '',
      ID_PERFIL: '',
      USUARIO: '',
      Contrasena: ''
    }
  }

  actualizarRegistro() {
    delete this.actualizarInfo.DESCRIPCION
    this.usuarioService.actualizarResgistro(this.actualizarInfo, this.actualizarInfo.ID_REGISTRO).subscribe(res => {
      console.log(res);
      console.log(this.actualizarInfo.ID_REGISTRO);
      Swal.fire({
        title: 'Actualizado!',
        text: 'Datos actualizados con exito.',
        icon: 'success',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          this.caragarDatos();

        }
      })
    })
  }

  eliminarUsuario(btnUsuario) {
    if (btnUsuario) {
      Swal.fire({
        title: 'Advertencia',
        text: "¿Esta seguro de que desea eliminar el usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si, elimínalo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(btnUsuario).subscribe(res => { });
          this.usuarioService.eliminarRegistro(btnUsuario).subscribe(res => { });
          Swal.fire(
            'Eliminado!',
            'El usuario se a eliminado con éxito.',
            'success'
          ).finally(() => {
            if (!result.isDismissed) {
              window.location.reload();
            }
          }
          )
        }
      })
    }
  }

  aprobarCC(dato) {
    if (dato == '' || dato == null) {
      this.err_cedula = false;
    } else {
      this.err_cedula = true;
    }
  }
  aprobarnombres(dato) {
    if (dato == '' || dato == null) {
      this.err_nombres = false;
    } else {
      this.err_nombres = true;
    }
  }
  aprobarapellidos(dato) {
    if (dato == '' || dato == null) {
      this.err_apellidos = false;
    } else {
      this.err_apellidos = true;
    }
  }
  aprobarcorreo(dato) {
    if (dato == '' || dato == null) {
      this.err_correo = false;
    } else {
      this.err_correo = true;
    }
  }
  aprobarperfil(dato) {
    if (dato == '' || dato == null) {
      this.err_perfil = false;
    } else {
      this.err_perfil = true;
    }
  }
  aprobarusuario(dato) {
    if (dato == '' || dato == null) {
      this.err_usuario = false;
    } else {
      this.err_usuario = true;
    }
  }
  aprobarcontrasena(dato) {
    if (dato == '' || dato == null) {
      this.err_contrasena = false;
    } else {
      this.err_contrasena = true;
    }
  }


}
