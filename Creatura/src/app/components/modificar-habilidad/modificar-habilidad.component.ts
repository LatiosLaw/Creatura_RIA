import { Component } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-modificar-habilidad',
  imports: [CommonModule, ReactiveFormsModule, PiePaginaComponent],
  templateUrl: './modificar-habilidad.component.html',
  styleUrl: './modificar-habilidad.component.scss'
})
export class ModificarHabilidadComponent {
habilidadForm: FormGroup;
  usuarioActual: any;
  tipos: any[] = [];
  habilidad: any;
  id_habilidad: any;

  constructor(private connector: ConeccionService, private route: ActivatedRoute, private fb: FormBuilder) {
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
  this.id_habilidad = this.route.snapshot.queryParamMap.get('idHabilidad');

  this.cargarTipos();  // carga tipos async

  if (this.id_habilidad) {
    this.informacion_habilidad(this.id_habilidad);
  }
}

// Carga tipos, y una vez cargados, si ya tenemos habilidad, hacemos patchValue
cargarTipos() {
  this.connector.getTipos().subscribe(data => {
    this.tipos = [...data];
    console.log(this.tipos);

    // Si ya tienes habilidad cargada, actualiza el form con los valores correctos
    if (this.habilidad) {
      this.setFormValues();
    }
  });
}

informacion_habilidad(id_habilidad: any) {
  this.connector.getHabilidad(id_habilidad).subscribe(data => {
    this.habilidad = data.habilidad;
    console.log(this.habilidad);

    // Si ya cargaste tipos, actualiza el form, sino lo hará cuando terminen de cargar
    if (this.tipos.length > 0) {
      this.setFormValues();
    }
  });
}

setFormValues() {
  this.habilidadForm.patchValue({
    nombre_habilidad: this.habilidad.nombre_habilidad,
    creador: this.habilidad.creador,
    descripcion: this.habilidad.descripcion,
    tipo: this.habilidad.id_tipo_habilidad,
    categoria: this.habilidad.categoria_habilidad,
    potencia: this.habilidad.potencia,
  });
}

  getColorByTipoId(id: string): string {
  const tipo = this.tipos?.find(t => t.id_tipo === id);
  return tipo ? tipo.color : 'ffffff'; // blanco por defecto
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


 onSubmit(): void {
  if (this.habilidadForm.valid && this.id_habilidad && this.habilidad.creador) {
    const formData = this.habilidadForm.value;

    // Asegurarse de que potencia no esté deshabilitada
    this.habilidadForm.get('potencia')?.enable({ emitEvent: false });

    console.log(formData);

    this.connector.modificarHabilidad(this.id_habilidad, this.habilidad.creador, formData)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del backend:', response);
          this.exito(); // Tu función para mostrar SweetAlert de éxito
        },
        error: (error) => {
          console.error('Error al modificar habilidad:', error);
          this.error(); // Tu función para mostrar SweetAlert de error
        }
      });
  } else {
    console.warn('Formulario inválido o datos faltantes');
  }
}

}
