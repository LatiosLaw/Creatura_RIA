import { Component, OnInit } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-alta-habilidad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PiePaginaComponent],
  templateUrl: './alta-habilidad.component.html',
  styleUrl: './alta-habilidad.component.scss'
})
export class AltaHabilidadComponent implements OnInit {
  habilidadForm: FormGroup;
  usuarioActual: any;
  tipos: any[] = [];

  constructor(private connector: ConeccionService, private fb: FormBuilder) {
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      this.usuarioActual = JSON.parse(usuarioData);
    }

this.habilidadForm = this.fb.group({
  nombre_habilidad: ['', Validators.required],
  creador: ['', Validators.required],
  descripcion: [''],
  tipo: ['', Validators.required],
  categoria: ['', Validators.required],
  potencia: ['', [Validators.required, Validators.min(0)]] // Ej: potencia no negativa
});
  }

  ngOnInit(): void {
    this.cargarTipos();

    if (this.usuarioActual?.nickname) {
      this.habilidadForm.patchValue({
        creador: this.usuarioActual.nickname
      });
    }

    // Escuchar cambios en la categoría
  this.habilidadForm.get('categoria')?.valueChanges.subscribe(categoria => {
    const potenciaControl = this.habilidadForm.get('potencia');

    if (categoria === 'ESTADO') {
      potenciaControl?.setValue(0);
      potenciaControl?.disable();  // Desactiva el campo
    } else {
      potenciaControl?.enable();   // Activa el campo si no es ESTADO
    }
  });
  }

  getColorByTipoId(id: string): string {
  const tipo = this.tipos?.find(t => t.id_tipo === id);
  return tipo ? tipo.color : '00000'; // blanco por defecto
}

  exito(){
    Swal.fire({
      title: "Exito!",
      text: "Habilidad registrada correctamente!",
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

  cargarTipos() {
    this.connector.getTipos().subscribe(data => {
      this.tipos = [...data];
      console.log(this.tipos);
    });
  }

  onSubmit() {
    if (this.habilidadForm.valid) {
       this.habilidadForm.get('potencia')?.enable({ emitEvent: false });
      const formData = this.habilidadForm.value;
console.log(formData);
      this.connector.Alta_Habilidad(formData).subscribe({
        next: () => {
          this.exito();
          this.habilidadForm.reset();
        },
        error: () => this.error(),
      });
    } else {
      console.warn('Formulario inválido');
    }
}
}
