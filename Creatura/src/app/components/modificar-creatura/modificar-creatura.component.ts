import { Component,OnInit  } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { BarraGestorCreaturaComponent } from '../barra-gestor-creatura/barra-gestor-creatura.component';

@Component({
  selector: 'app-modificar-creatura',
  imports: [RouterOutlet,RouterLink,CommonModule, NgOptimizedImage,BarraGestorCreaturaComponent],
  templateUrl: './modificar-creatura.component.html',
  styleUrl: './modificar-creatura.component.scss'
})
export class ModificarCreaturaComponent {
  constructor(private connector: ConeccionService, private route: ActivatedRoute) {}
  movesets: any[] = [];
  creatura: any;
  idCreatura:any;

  tipos1: any[] = [];
  tipos2: any[] = [];


  cargarTipos(){
    //tipo1 = ""
    //tipo2 = ""
  }
  limpiarListaDeTipos(idTipo1:any, idTipo2:any){
    this.tipos1.forEach(element => {
      if(element.id_tipo === idTipo1){
        this.tipos1.splice(idTipo1,1);
      }
      if(element.id_tipo === idTipo2){
        this.tipos1.splice(idTipo2,1);
      }
    });
  }
  mostrarCreatura(){
      this.connector.getCreaturaConTipos(this.idCreatura).subscribe(data => {
        console.log(data);
          this.creatura = data;
            
          });
  }
  mostrarHabilidades(){
    this.connector.getMoveset(this.idCreatura).subscribe(data => {
      console.log(data);
      this.movesets = data;
    })
  }
  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(
      params => {
        this.idCreatura = params['idCreatura'];
      }
    )
    this.mostrarCreatura();
    this.mostrarHabilidades();
  }



}
