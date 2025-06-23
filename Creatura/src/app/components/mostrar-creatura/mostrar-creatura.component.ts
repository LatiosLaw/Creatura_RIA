import { Component,OnInit  } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BarraGestorCreaturaComponent } from '../barra-gestor-creatura/barra-gestor-creatura.component';

@Component({
  selector: 'app-mostrar-creatura',
  imports: [RouterOutlet,RouterLink,CommonModule,ReactiveFormsModule, FormsModule, NgOptimizedImage,BarraGestorCreaturaComponent],
  templateUrl: './mostrar-creatura.component.html',
  styleUrl: './mostrar-creatura.component.scss'
})
export class MostrarCreaturaComponent {
  constructor(private connector: ConeccionService,private route: ActivatedRoute) {
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      this.usuarioActual = JSON.parse(usuarioData);
    }
  }
  creatura:any;
  barraRateBlock:boolean = false;
  idCreatura:any;
  usuarioActual:any;
  movesets: any[] = [];
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  creturaRating = 0;
  typeNull = {
    id_tipo: "0",
    nombre_tipo: "-",
    color :"eaeae5",
    icono : "no.png",
    creador : "tuvieja"
  }

  cargarCreatura(){
      this.connector.getCreaturaConTipos(this.idCreatura).subscribe(data => {
        console.log(data);
        var tipo2:any;
        if(!data.creatura.id_tipo2){
          tipo2 = this.typeNull;
        }else{
          tipo2 = data.creatura.tipo2;
        }
        this.creatura = {
          id_creatura: data.creatura.id_creatura,
          nombre_creatura: data.creatura.nombre_creatura,
          id_tipo1: data.creatura.id_tipo1,
          id_tipo2: tipo2,
          descripcion: data.creatura.descripcion,
          hp: data.creatura.hp,
          atk: data.creatura.atk,
          def: data.creatura.def,
          spa: data.creatura.spa,
          sdef: data.creatura.sdef,
          spe: data.creatura.spe,
          creador: data.creatura.creador,
          imagen: data.creatura.imagen,
          rating: data.creatura.rating_promedio,
          tipo1:{
            id_tipo: data.creatura.tipo1.id_tipo,
            nombre_tipo: data.creatura.tipo1.nombre_tipo,
            color: data.creatura.tipo1.color,
            icono: data.creatura.tipo1.icono,
            creador: data.creatura.tipo1.creador,
          },
          tipo2:{
            id_tipo: tipo2.id_tipo,
            nombre_tipo: tipo2.nombre_tipo,
            color: tipo2.color,
            icono: tipo2.icono,
            creador: tipo2.creador,
          }
        };
        this.creturaRating = this.creatura.rating;
    });
  }
  cargarMoveset(){
    this.connector.getMoveset(this.idCreatura).subscribe(data => {
      console.log("get Moveset");
      console.log(data);
      this.movesets = data.habilidades;
    })
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.idCreatura = params['idCreatura'];
      })
   this.cargarCreatura();
   this.cargarMoveset();
   const datos ={
      id_creatura: this.idCreatura,
      usuario: this.usuarioActual.nickname
   }
   this.chequearSiRateo(datos);

  }
  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }
  ratingMomento(value: number): void {
    if(!this.barraRateBlock){
      this.barraRateBlock = true;
      this.rating = value;

    const datos = {
      id_creatura: this.idCreatura,
      usuario: this.usuarioActual.nickname,
      puntaje: this.rating
    }
    this.connector.modificarCalificacion(datos).subscribe(params => {
      this.creturaRating = params.puntaje;
    })
    console.log('Rating seleccionado:', this.rating);
    }
    
  }
  chequearSiRateo(datos:any){
    this.connector.chequearSiRateo(datos).subscribe(params => {
      console.log("rateo chequeacion momento");
      console.log(params);
      if(params.ok == 0){
        this.barraRateBlock = false;
      }else{
        console.log(params.ok.estrellas);
        this.barraRateBlock = true;
        this.rating = params.ok.estrellas;
      }
    })
  }
}
