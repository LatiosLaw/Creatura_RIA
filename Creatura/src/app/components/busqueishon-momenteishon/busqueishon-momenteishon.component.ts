import { Component,OnInit  } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busqueishon-momenteishon',
  imports: [RouterOutlet,RouterLink,CommonModule, NgOptimizedImage],
  templateUrl: './busqueishon-momenteishon.component.html',
  styleUrl: './busqueishon-momenteishon.component.scss'
})
export class BusqueishonMomenteishonComponent implements OnInit{
  constructor(private connector: ConeccionService,private route: ActivatedRoute) {
    //const usuarioData = localStorage.getItem('usuarioActual');
   // if (usuarioData) {
    //  this.usuarioActual = JSON.parse(usuarioData);
    //}
  }
  usuarioActual:any;
  creaturas: any[]=[];
  creaturasDeUsuarios: any[]=[];
  usuarios: any[]=[];
  creaturasTipo:any[]=[];
  datiBuscar:any;
  mostrarNormal:boolean=true;
  error:boolean=false;
  cargarCosas(){
    
   this.connector.buscar(this.datiBuscar).subscribe(
    (res) => {
      this.error = false;
    console.log("hola");
    this.creaturas = res.creaturas;

    this.creaturasDeUsuarios = res.creaturasUsr;
    this.usuarios = res.usuarios;
    console.log("hola");
    this.creaturasTipo = res.creaturasTipo;
    if(this.creaturasTipo){
      this.mostrarNormal = false;
    }else{
      this.mostrarNormal = true;
    }
   // console.log(this.creaturas);
  
  },
  (error) => {
    this.error = true;
    console.error("Error al buscar:", error);
    this.creaturas = [];
    this.creaturasDeUsuarios = [];
    this.usuarios = [];
    this.creaturasTipo = [];
    // Código que querés ejecutar si falla:
    this.mostrarNormal = true;
    //Swal.fire("Error", "No se pudieron obtener los datos de búsqueda.", "error");
  }


);
  console.log("hola");
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.datiBuscar = params['datoBusqueda'];
        this.cargarCosas();
      })

}
onImgErrorCreatura(event: Event) {
  const element1 = event.target as HTMLImageElement;
  element1.src = 'defoult.png'; // Ruta de imagen por defecto
}

onImgErrorUsuario(event: Event) {
  const element2 = event.target as HTMLImageElement;
  element2.src = 'defoultUser.png'; // Ruta de imagen por defecto
}
}
