import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../serviceses/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modificar-usuario.component.html',
  styleUrl: './modificar-usuario.component.scss'
})
export class ModificarUsuarioComponent {
  usuarioLogueado: any = null;
 registroForm: FormGroup;
  imagen_usuario = "";

 constructor(private fb: FormBuilder, 
    private usuarioService : UsuarioService) {
const data = localStorage.getItem('usuarioActual');
    if (data) {
      this.usuarioLogueado = JSON.parse(data);
    }

    this.registroForm = this.fb.group({
      nickname: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contra: [''],
      ver_contra: [''],
      biografia: [''],
    }, {
      
    });

    this.registroForm.patchValue({
  nickname: this.usuarioLogueado.nickname
});

 this.registroForm.patchValue({
  correo: this.usuarioLogueado.correo
});

this.registroForm.patchValue({
  biografia: this.usuarioLogueado.biografia
});

this.registroForm.patchValue({
  img_vieja: this.usuarioLogueado.foto
});

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
        contraseña: formValue.contra,          // renombrado
        foto: this.imagen_usuario,          // renombrado
        biografia: formValue.biografia,
      };

      console.log(datos);
  
      this.usuarioService.modificarUsuario(datos).subscribe({
        next: () => {
          this.exito();
          if(this.imagen_usuario!=""){
localStorage.setItem('usuarioActual', JSON.stringify({
          nickname: this.usuarioLogueado.nickname,
          correo: this.usuarioLogueado.correo,
          biografia: formValue.biografia,
          foto: this.imagen_usuario
        }));
          }else{
localStorage.setItem('usuarioActual', JSON.stringify({
          nickname: this.usuarioLogueado.nickname,
          correo: this.usuarioLogueado.correo,
          biografia: formValue.biografia,
          foto: this.usuarioLogueado.foto
        }));
          }

          
        },
        error: () => this.error(),
      });
    } else {
      console.warn('Formulario inválido');
    }
  }

   onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagen_usuario = reader.result as string;
      console.log("imagen usuario:");
      console.log(this.imagen_usuario);  // <- acá sí ya estará disponible
    };

    reader.readAsDataURL(file); 
  }
}
  
}
