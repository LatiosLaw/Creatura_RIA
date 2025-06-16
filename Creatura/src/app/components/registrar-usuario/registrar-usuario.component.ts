import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../serviceses/local-storage.service';
import { UsuarioService } from '../../serviceses/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.scss'
})
export class RegistrarUsuarioComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private usuarioService : UsuarioService,
    private localStorage: LocalStorageService) {
    this.registroForm = this.fb.group({
      nickname: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      verificarContrasena: ['', Validators.required],
      fotoPerfil: [null],
      biografia: [''],
    }, {
      validators: this.contrasenasIguales
    });
  }

  contrasenasIguales(group: FormGroup) {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('verificarContrasena')?.value;
    return pass === confirm ? null : { contrasenasNoCoinciden: true };
  }

  exito(){
    Swal.fire({
      title: "Exito!",
      text: "Usuario registrado correctamente!",
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

  onSubmit() {
    if (this.registroForm.valid) {
      const formValue = this.registroForm.value;
  
      const datos = {
        nickname: formValue.nickname,
        correo: formValue.correo,
        contraseña: formValue.contrasena,          // renombrado
        foto: formValue.fotoPerfil,                // renombrado
        biografia: formValue.biografia,
      };
  
      this.usuarioService.registrarUsuario(datos).subscribe({
        next: () => {
          this.exito();
          this.registroForm.reset();
        },
        error: () => this.error(),
      });
    } else {
      console.warn('Formulario inválido');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.registroForm.patchValue({ fotoPerfil: file });
    }
  }
}
