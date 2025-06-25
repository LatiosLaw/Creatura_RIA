import { Component,OnInit  } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listado-creatura',
  imports: [RouterOutlet,RouterLink,CommonModule, NgOptimizedImage],
  templateUrl: './listado-creatura.component.html',
  styleUrl: './listado-creatura.component.scss'
})
export class ListadoCreaturaComponent implements OnInit{
  creaturas: any[] = [];
  constructor(private connector: ConeccionService) {
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      this.usuarioActual = JSON.parse(usuarioData);
    }
  }
  usuarioActual:any;

  eliminarCreatura(idCreatura:any){
    
    Swal.fire({
      title: "Está seguro que desea eliminar esta Creatura™",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.connector.eliminarCreatura(idCreatura).subscribe({
          next: () => {
            this.cargarCreaturasLista(); // recarga el listado
            Swal.fire("Eliminada", "La creatura ha sido eliminada.", "success");
          },
          error: () => {
            Swal.fire("Error", "No se pudo eliminar la creatura.", "error");
          }
        });
      }
    });
    
  }
  mostrarJScreatura(id: any) {
    this.connector.getCreatura(id).subscribe(data => {
      Swal.fire({
        title: 'Exportación de la creatura con el id: ' + id,
        html: `<pre style="text-align: left;">
        "id_creatura": ${data.creatura.id_creatura},
        "nombre_creatura": ${data.creatura.nombre},
        "id_tipo1": ${data.creatura.id_tipo1},
        "id_tipo2": ${data.creatura.id_tipo2},
        "descripcion": ${data.creatura.descripcion},
        "hp": ${data.creatura.hp},
        "atk": ${data.creatura.atk},
        "def": ${data.creatura.def},
        "spa": ${data.creatura.spa},
        "sdef": ${data.creatura.sdef},
        "spe": ${data.creatura.spe},
        "creador": ${data.creatura.creador},
        "imagen": ${data.creatura.imagen},
        "publico": ${data.creatura.publico}
        </pre>`,
        confirmButtonColor: '#3085d6',
      });
    });
  }
  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }
  cargarCreaturasLista(){
    this.connector.listadoCreaturaConTiposDeUsuario(this.usuarioActual.nickname).subscribe((res) => {
      this.creaturas = res.creaturas;
     // console.log(this.creaturas);

    });
  }
  ngOnInit(): void {
    //this.connector.eliminarCreatura(1);

    this.connector.listadoCreaturaConTiposDeUsuario(this.usuarioActual.nickname).subscribe((res) => {
      this.creaturas = res.creaturas;
      console.log(this.creaturas);

    });


}
}