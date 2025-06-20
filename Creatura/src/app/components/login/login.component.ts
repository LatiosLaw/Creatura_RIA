import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../serviceses/usuario.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private UsuarioService: UsuarioService) {
    this.loginForm = this.fb.group({
      nickname: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  exito(){
      Swal.fire({
        title: "Exito!",
        text: "Sesion iniciada correctamente!",
        icon: "success"
      });
    }
  
    error(){
      Swal.fire({
        title: "Error!",
        text: "Algo ha salido mal!",
        icon: "error"
      });
    }
  
    iniciarSesion() {
      if (this.loginForm.valid) {
        const { nickname, contrasena } = this.loginForm.value;
    
        this.UsuarioService.loginUsuario(nickname, contrasena).subscribe({
          next: (usuario) => {
            this.exito();
            setTimeout(() => {
              location.reload();
            }, 1000);  // 1000 ms = 1 segundo
    
            this.loginForm.reset();
    
            const modalElement = document.getElementById('iniciarSesionModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
    
            // Aquí podés redirigir o mostrar otra alerta si querés
          },
          error: (err) => {
            this.error();
            // Mostrar error en UI
          }
        });
      }
    }
    
  
  
}