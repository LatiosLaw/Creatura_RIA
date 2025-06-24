import { Component } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-habilidad',
  imports: [RouterOutlet,RouterLink,CommonModule, NgOptimizedImage],
  templateUrl: './listado-habilidad.component.html',
  styleUrl: './listado-habilidad.component.scss'
})
export class ListadoHabilidadComponent {
 habilidades: any[] = [];
  constructor(private connector: ConeccionService) {
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      this.usuarioActual = JSON.parse(usuarioData);
    }
  }
  usuarioActual:any;

  eliminarHabilidad(idCreatura:any){
    
    Swal.fire({
      title: "Está seguro que desea eliminar esta Habilidad",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.connector.Baja_Habilidad(idCreatura).subscribe({
          next: () => {
            this.cargarHabilidadesLista(); // recarga el listado
            Swal.fire("Eliminada", "La habilidad ha sido eliminada.", "success");
          },
          error: () => {
            Swal.fire("Error", "No se pudo eliminar la habilidad.", "error");
          }
        });
      }
    });
    
  }
mostrarJSHabilidad(id: any) {
  this.connector.getHabilidad(id).subscribe(data => {
    Swal.fire({
      title: `Exportación de la Habilidad con el id: ${id}`,
      html: `<pre style="text-align: left;">
{
  "id_habilidad": ${JSON.stringify(data.habilidad.id_habilidad)},
  "nombre": ${JSON.stringify(data.habilidad.nombre_habilidad)},
  "id_tipo": ${JSON.stringify(data.habilidad.id_tipo_habilidad)},
  "descripcion": ${JSON.stringify(data.habilidad.descripcion)},
  "categoria": ${JSON.stringify(data.habilidad.categoria_habilidad)},
  "potencia": ${JSON.stringify(data.habilidad.potencia)},
  "creador": ${JSON.stringify(data.habilidad.creador)}
}
      </pre>`,
      confirmButtonColor: '#3085d6',
    });
  });
}

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }
  cargarHabilidadesLista(){
    this.connector.Listar_Habilidades_Creadas_Por(this.usuarioActual.nickname).subscribe((res) => {
      this.habilidades = res.habilidades;


    });
  }
  ngOnInit(): void {

    this.connector.Listar_Habilidades_Creadas_Por(this.usuarioActual.nickname).subscribe((res) => {
      this.habilidades = res.habilidades;
      console.log(this.habilidades);

    });


}
}
