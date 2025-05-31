import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.scss'
})
export class RegistrarUsuarioComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  onSubmit() {
    if (this.registroForm.valid) {
      const datos = this.registroForm.value;
      console.log('Formulario válido:', datos);
      // Aquí podrías enviar el formulario a una API o guardarlo en localStorage
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
