import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service'
import { UsuarioService } from '../../services/usuario/usuario.service'
import { Login } from '../../Model/login'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Login = {
    USUARIO: '',
    Contrasena: '',
    ID_PERFIL: ''
  }

  newDatos = {
    USUARIO: '',
    Correo: ''
  }

  newDatos2 = {
    USUARIO: '',
    Contrasena: '',
    Contrasena1: '',
    newDatos: ''
  }



  constructor(private loginserve: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private ngxSpinnerService: NgxUiLoaderService) { }

  ngOnInit(): void {
  }

  Iniciarsesion() {
    this.ngxSpinnerService.start();
    this.loginserve.loginUser(this.usuario.USUARIO, this.usuario.Contrasena).subscribe(res => {
      this.usuario = res.signedUser
      localStorage.setItem("perfil", JSON.stringify(this.usuario.ID_PERFIL));
      this.loginserve.setUser(this.usuario.USUARIO, res.token)
      this.ngxSpinnerService.stop();
      if (this.loginserve.isAnalistas || this.loginserve.isSoporte || this.loginserve.isDesarrollo) {
        this.router.navigate(['/Seguimientos']);
      } else {
        this.router.navigate(['/Seguimientos-listar']);
      }
    },
      () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Usuario y/o Contraseña incorrecto",
          showConfirmButton: true,
          allowOutsideClick: false, // NO PERMITE QUE SE CIERRE AL DAR CLIC POR FUERA
        })
        this.ngxSpinnerService.stop();
      })

  }

  pressEnter(event) {
    if (event.key == "Enter") {
      this.Iniciarsesion();
    }
  }

  limpiar() {
    this.newDatos = {
      USUARIO: '',
      Correo: ''
    }
  }

  limpiar2() {
    this.newDatos2 = {
      USUARIO: '',
      Contrasena: '',
      Contrasena1: '',
      newDatos: ''
    }
  }


  resetContrasena() {
    this.usuarioService.resetContraseña(this.newDatos).subscribe(res => {
      Swal.fire({
        title: 'Contraseña reseteada con exito!',
        text: 'Revisa el correo electrónico ingresado, ',
        icon: 'success',
        allowOutsideClick: false
      }

      ).then((result) => {
        if (result.value) {
        }
      })
    })
  }

  cambiarContrasena() {
    if (this.newDatos2.Contrasena1 == this.newDatos2.newDatos) {
      this.usuarioService.cambiarContrasena(this.newDatos2.newDatos, this.newDatos2.USUARIO, this.newDatos2.Contrasena).subscribe(res => {
        Swal.fire({
          text: 'Contraseña actualizada con exito!',
          icon: 'success',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            window.location.reload();
          }
        })
      },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Usuario y/o Contraseña incorrecto",
            showConfirmButton: true,
            allowOutsideClick: false, // NO PERMITE QUE SE CIERRE AL DAR CLIC POR FUERA
          })
        })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Las contraseñas no cohinciden",
        showConfirmButton: true,
        allowOutsideClick: false, // NO PERMITE QUE SE CIERRE AL DAR CLIC POR FUERA
      })
    }
  }

}

