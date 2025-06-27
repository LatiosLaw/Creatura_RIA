import { Component,OnInit  } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { ListadoCreaturaComponent } from '../listado-creatura/listado-creatura.component';
import { BarraGestorCreaturaComponent } from '../barra-gestor-creatura/barra-gestor-creatura.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';


@Component({
  selector: 'app-gestor-creatura',
  imports: [RouterOutlet,RouterLink,ListadoCreaturaComponent,BarraGestorCreaturaComponent,CommonModule, NgOptimizedImage, PiePaginaComponent],
  templateUrl: './gestor-creatura.component.html',
  styleUrl: './gestor-creatura.component.scss'
})
export class GestorCreaturaComponent implements OnInit{
  creaturas: any[] = [];
  constructor(private connector: ConeccionService) {}
  
  eliminarCreatura(idCreatura:any){
    this.connector.eliminarCreatura(idCreatura);
    Swal.fire({
      icon: 'success',
      title: 'Creatura Eliminada de id:' + idCreatura,
      text: `Se eliminó la Creatura.`,
      confirmButtonColor: '#3085d6',
    });
    this.cargarCreaturasLista();
  }
  mostrarJScreatura(id:any){
    this.connector.getCreatura(id).subscribe(data => {
      console.log(data);
      Swal.fire({
        title: 'Exportacion de la creatura con el id: ' + id,
        text: `
        "id_creatura": ${data.id_creatura},
        "nombre_creatura": ${data.nombre_creatura},
        "id_tipo1": ${data.id_tipo1},
        "id_tipo2": ${data.id_tipo2},
        "descripcion": ${data.descripcion}",
        "hp": ${data.hp},
        "atk": ${data.atk},
        "def": ${data.def},
        "spa": ${data.spa},
        "sdef": ${data.sdef},
        "spe": ${data.spe},
        "creador": ${data.creador},
        "imagen": ${data.imagen},
        "publico": ${data.publico}`,

        confirmButtonColor: '#3085d6',
      });
    });
  

  }
  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.jpg'; // Ruta de imagen por defecto
  }
  cargarCreaturasLista(){
    this.connector.listadoCreaturaConTipos().subscribe((res) => {
      this.creaturas = res;
     // console.log(this.creaturas);

    });
  }
  ngOnInit(): void {
    //this.connector.eliminarCreatura(1);

    this.connector.listadoCreaturaConTipos().subscribe((res) => {
      this.creaturas = res;
      console.log(this.creaturas);

    });


}
}