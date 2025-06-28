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
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatPaginatorIntl } from '@angular/material/paginator';

import {customPaginator} from '../../../cosas/matPag';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-agregar-creatura',
  imports: [RouterOutlet,RouterLink,CommonModule,ReactiveFormsModule,MatPaginatorModule, FormsModule, NgOptimizedImage,BarraGestorCreaturaComponent,PiePaginaComponent],
  templateUrl: './agregar-creatura.component.html',
  styleUrl: './agregar-creatura.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class AgregarCreaturaComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datosCreaturaForm: FormGroup;
  creatura: any;
  creador: any;
  idTipo1:any;
  idTipo2:any;
  tipo3:any;
  tipo1:any;
  tipo2:any;
  usuarioActual:any;
  movesets: any[] = [];
  idCreatura:any;
  habilidades: any[] =[];
  tipos1: any[] = [];
  tipos2: any[] = [];
  tipos3: any[] = [];

  calculoDef: any[] = [];
  calculoDefMuyEff: any[] = [];
  calculoDefEff: any[] = [];
  calculoDefNeu: any[] = [];
  calculoDefNoEff: any[] = [];
  calculoDefMuyNoEff: any[] = [];
  calculoDefInmune: any[] = [];

  paginadas: any[] = [];

  paginaActual = 0;
  tamaPagina = 8;
  terminoBusqueda="";
  habilidadesFiltradas:any[] = [];
  habilidades2:any[] =[];

  typeNull = {
    id_tipo: "0",
    nombre_tipo: "-",
    color :"eaeae5",
    icono : "no.png",
    creador : "tuvieja"
  }



  habilidadesNew: any[] = [];
  imagenCreatura = "defoult.jpg";
  imagenCreatura2:any;
  constructor(private connector: ConeccionService, private fb: FormBuilder,private route: ActivatedRoute) {
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      this.usuarioActual = JSON.parse(usuarioData);
    }
    this.datosCreaturaForm = this.fb.group({
      hp: [null, [Validators.required, Validators.min(1), Validators.max(255)]],
      atk: [null, [Validators.required, Validators.min(1), Validators.max(255)]],
      satk: [null, [Validators.required, Validators.min(1), Validators.max(255)]],
      def: [null, [Validators.required, Validators.min(1), Validators.max(255)]],
      sdef: [null, [Validators.required, Validators.min(1), Validators.max(255)]],
      spe: [null, [Validators.required, Validators.min(1), Validators.max(255)]],
      descripcion: [null, []],
      nombre: [null, [Validators.required]],
      publicoToken: [false, []]
    });
   
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.tamaPagina = event.pageSize;
    this.actualizarListaPaginada();
  }
  actualizarListaPaginada(){
   // alert(this. paginaActual + "///" + this.tamaPagina);
    const start = this.paginaActual * this.tamaPagina;
    const end = start + this.tamaPagina;
    this.paginadas = this.habilidades.slice(start, end);
  }

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }
  cargarCalculoDef(){
    this.connector.getCalculaDef(this.tipo1.id_tipo,this.tipo2.id_tipo).subscribe(data => {
      this.calculoDefEff = [];
      this.calculoDefMuyEff = [];
      this.calculoDefMuyNoEff = [];
      this.calculoDefNoEff = [];
      this.calculoDefNeu = [];
      this.calculoDefInmune = [];
      console.log("get calculos defensivos");
      console.log(data);
      this.calculoDef = data.defensas;
      this.calculoDef.forEach(element => {
        if(element.multiplicador === 0){
          this.calculoDefInmune.push(element);
        }else if(element.multiplicador === 1){
          this.calculoDefNeu.push(element);
        }else if(element.multiplicador === 2){
          this.calculoDefEff.push(element);
        }else if(element.multiplicador === 4){
          this.calculoDefMuyEff.push(element);
        }else if(element.multiplicador === 0.5){
          this.calculoDefNoEff.push(element);
        }else if(element.multiplicador === 0.25){
          this.calculoDefMuyNoEff.push(element);
        }
      });
      
      this.calculoDefEff = [...this.calculoDefEff];
      this.calculoDefMuyEff = [...this.calculoDefMuyEff];
      this.calculoDefMuyNoEff = [...this.calculoDefMuyNoEff];
      this.calculoDefNoEff = [...this.calculoDefNoEff];
      this.calculoDefNeu = [...this.calculoDefNeu];
      this.calculoDefInmune = [...this.calculoDefInmune];

    })
  }
  ngOnInit(): void {
    this.tipo3 = this.typeNull;
    this.creador = "token"
    this.imagenCreatura = "defoult.png"
   // this.cargarTipos();
    this.cargarTipos2().then((resolve:any) => {
      this.cargarCalculoDef();
    });
    this.habilideishon();

    this.idTipo1 = 1;
    this.idTipo2 = 0;
    this.tipo1 = this.typeNull;
    this.tipo2 = this.typeNull;
    

    this.datosCreaturaForm.patchValue({
      hp: 1, 
      atk: 1,
      def: 1,
      sdef: 1,
      satk: 1,
      spe: 1,
    });

  }
  cargarTipos2():Promise<void> {
    return new Promise((resolve, reject) => {
    this.connector.getTipos().subscribe(data => {
      console.log(data);

      this.tipos1 = [...data];
      this.tipos2 = [...data];
      this.tipos3 = [...data];
      this.tipos2.push(this.typeNull);
      this.tipos3.push(this.typeNull);
      this.limpiarListaDeTipos()
      resolve();
    })
  })
  }
  cargarTipos(){
    this.connector.getTipos().subscribe(data => {
      console.log(data);
    
      this.tipos1 = [...data];
      this.tipos2 = [...data];
      this.tipos3 = [...data];
      this.tipos2.push(this.typeNull);
      this.tipos3.push(this.typeNull);
      this.limpiarListaDeTipos()
    })
  }
  limpiarListaDeTipos(){
    console.log(this.tipos1);
    console.log(this.creatura);
    
    const idTipo1 = this.tipo1.id_tipo;
    const idTipo2 = this.tipo2.id_tipo;

    this.tipos1 = this.tipos1.filter(tipo => tipo.id_tipo !== idTipo1 && tipo.id_tipo !== idTipo2);
    this.tipos2 = this.tipos2.filter(tipo => tipo.id_tipo !== idTipo1 && tipo.id_tipo !== idTipo2);

  }
  seleccionarTipo1(tipo: any): void {
    this.tipo1 = tipo;
    this.cargarTipos();
    this.cargarCalculoDef();

  }
  seleccionarTipo2(tipo: any): void {
    this.tipo2 = tipo;
    this.cargarTipos();
    this.cargarCalculoDef();

  }

  seleccionartipo3(tipo: any): void {
    this.tipo3 = tipo;
    this.paginator.pageIndex = 0;
    this.paginaActual = 0;
    this.tamaPagina = 8;
    this.habilideishon();


  }
  cargarHabilidades2():Promise<void> {
    return new Promise((resolve, reject) => {
      this.connector.getHabilidadesConTipos().subscribe(data => {
        console.log("getHabilidades");
        console.log(data);
        this.habilidades = data.habilidades;
        this.habilidades2 = data.habilidades;
        resolve();
      })
    });
  }
  listarHabilidadesPorTipos(tipo:any):Promise<void> {
    return new Promise((resolve, reject) => {
      this.connector.getHabilidadesPorTipo(tipo).subscribe(data => {
        console.log("getHabilidades por TIPO");
        console.log(data.habilidades);
        console.log(this.tipo3);
        this.habilidades2 = data.habilidades;

        this.habilidades = data.habilidades;
        resolve();
      })
    });
  }
  limpiarListaHabilidades(){

    this.movesets.forEach(element => {
      this.habilidades = this.habilidades.filter(habilidad => habilidad.id_habilidad !== element.id_habilidad);
    });

    this.habilidadesNew.forEach(element => {
      this.habilidades = this.habilidades.filter(habilidad => habilidad.id_habilidad !== element.id_habilidad);
    });
  }

  habilideishon(){
    if(this.tipo3.id_tipo === "0"){
      this.cargarHabilidades2().then((resolve:any) => {
        this.limpiarListaHabilidades();
        this.filtrarHabilidadesPorTexto();
        this.actualizarListaPaginada();
        this.habilidades2 = [...this.habilidades];
      });
    }else{
      this.cargarTipos();
    this.listarHabilidadesPorTipos(this.tipo3.id_tipo).then((resolve:any) => {
      this.limpiarListaHabilidades();
      this.filtrarHabilidadesPorTexto();
      this.actualizarListaPaginada();
    });
    }
  }

  eliminarHabilidad(movesetAeli:any){
    //this.movesets.splice(movesetAeli.id_moveset,1);
    this.movesets = this.movesets.filter(movesett => movesett.id_habilidad !== movesetAeli.id_habilidad);
    console.log(this.movesets);
    this.habilideishon();
  }
  eliminarHabilidadDeNew(habilidadd:any){
    this.habilidadesNew = this.habilidadesNew.filter(habilidad => habilidad.id_habilidad !== habilidadd.id_habilidad);
    this.seleccionartipo3(this.tipo3);
    this.habilidades.push(habilidadd);
 }
  agregarHabilidad(habilidadd:any){
    this.habilidades = this.habilidades.filter(habilidad => habilidad.id_habilidad !== habilidadd.id_habilidad);
    this.habilidadesNew.push(habilidadd);
    this.actualizarListaPaginada();
 }
 genuinamenteAgregar(){
  this.habilidadesNew.forEach(element => {

    this.movesets.push(element);
    console.log(this.movesets);
  });

  ////////////////////////////////////////////////////////
  this.habilidadesNew = [];
  //this.genuinaGenuinamenteAgregar();
  
//moveset.habilidad.nombre_habilidad

}
 genuinaGenuinamenteAgregar(){
  if(this.tipo1.id_tipo !== "0"){
    var hpNew = this.datosCreaturaForm.get('hp')?.value;
      var atkNew = this.datosCreaturaForm.get('atk')?.value;
      var defNew = this.datosCreaturaForm.get('def')?.value;
      var sdefNew = this.datosCreaturaForm.get('sdef')?.value;
      var spaNew = this.datosCreaturaForm.get('satk')?.value;
      var speNew = this.datosCreaturaForm.get('spe')?.value;
      var publicoPosta = 0;
      if(this.datosCreaturaForm.get('publicoToken')?.value){
        publicoPosta = 1;
      }
      //////If momento////////////////////////////////////////////////////////////////////////////////
     if(hpNew > 255){
       hpNew = 255;
  
    }else if(hpNew < 1){
      hpNew = 1;
    }
      
    if(atkNew > 255){
      atkNew = 255;
     }else if(atkNew < 1){
      atkNew = 1;
     }
  
    if(defNew > 255){
      defNew = 255;
    }else if(defNew < 1){
      defNew = 1;
    }
  
    if(sdefNew > 255){
      sdefNew = 255;
    }else if(sdefNew < 1){
      sdefNew = 1;
    }
  
    if(spaNew > 255){
      spaNew = 255;
    }else if(spaNew < 1){
      spaNew = 1;
    }
  
    if(speNew > 255){
      speNew = 255;
    }else if(speNew < 1){
      speNew = 1;
    }
    var desc = this.datosCreaturaForm.get('descripcion')?.value;
  if(!desc){
    this.datosCreaturaForm.patchValue({
      descripcion: "",
    });
  }
    this.datosCreaturaForm.patchValue({
      hp: hpNew, 
      atk: atkNew,
      def: defNew,
      sdef: sdefNew,
      satk: spaNew,
      spe: speNew
    });
      //////If momento////////////////////////////////////////////////////////////////////////////////

    if (this.datosCreaturaForm.valid) {
      
      const newCretura = {
        //id_creatura: this.creatura.id_creatura,
        nombre_creatura: this.datosCreaturaForm.get('nombre')?.value,
        hp:   hpNew,
        atk:  atkNew,
        def:  defNew,
        sdef: sdefNew,
        spa:  spaNew,
        spe:  speNew,
        descripcion: this.datosCreaturaForm.get('descripcion')?.value,
        id_tipo1: this.tipo1.id_tipo,
          id_tipo2: this.tipo2.id_tipo,
          imagen: this.imagenCreatura,
          publico: publicoPosta,
          creador: this.usuarioActual.nickname,
          habilidades: this.movesets,
    }
      console.log("New Creatura:");
      console.log(newCretura);
  
      /////////////////////////////////////
      console.log("New Creatura's Movepool");
      console.log(this.movesets);
      this.connector.CrearCreatura(newCretura).subscribe({
        next: () => {
          Swal.fire("Agregada", "La creatura ha sido agregada.", "success");
        },
       error: () => {
          Swal.fire("Error", "No se pudo agregar la creatura.", "error");
       }
      })
  
    } else{
        Swal.fire("Error", "No se pudo agregar la creatura, faltan campos.", "error");
        this.datosCreaturaForm.markAllAsTouched()
      }
  }else{
    Swal.fire("Error", "El primer tipo no puede ser nulo", "error");
  }
 

 }
 validarRango(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = parseInt(input.value, 10);

  if (value > 255) input.value = '255';
  if (value < 1) input.value = '1';
}
onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagenCreatura = reader.result as string;
    };

    reader.readAsDataURL(file); 
    console.log(file);
    this.imagenCreatura2 = file;
    console.log("imagenCreatura2");
    console.log(this.imagenCreatura2);
  }
}
filtrarHabilidadesPorTexto(){
  this.paginator.pageIndex = 0;
  this.paginaActual = 0;
  this.tamaPagina = 8;
  const terminoMinuscula = this.terminoBusqueda.toLowerCase().trim();
  if(this.terminoBusqueda !== ""){
  this.habilidadesFiltradas = this.habilidades2.filter(habilidad => habilidad.nombre_habilidad.toLowerCase().includes(terminoMinuscula));
    this.habilidades = this.habilidadesFiltradas;
    this.limpiarListaHabilidades();
    this.actualizarListaPaginada();
}else{
  this.habilidades = this.habilidades2;
  this.limpiarListaHabilidades();
  this.actualizarListaPaginada();
 }
}
}

