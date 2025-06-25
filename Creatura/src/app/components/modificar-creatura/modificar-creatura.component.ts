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
  selector: 'app-modificar-creatura',
  imports: [RouterOutlet,RouterLink,CommonModule,ReactiveFormsModule, FormsModule, NgOptimizedImage,BarraGestorCreaturaComponent],
  templateUrl: './modificar-creatura.component.html',
  styleUrl: './modificar-creatura.component.scss'
})
export class ModificarCreaturaComponent {
  datosCreaturaForm: FormGroup;
  typeNull = {
    id_tipo: "0",
    nombre_tipo: "-",
    color :"eaeae5",
    icono : "no.png",
    creador : "tuvieja"
  }
  
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
  usuarioActual:any;
  imagenCreatura = "defoult.jpg";
  imagenCreatura2:any;
  movesets: any[] = [];
  movesets2: any[] = [];
  tipo3:any;
  movesetsEli: any[] = [];
  habilidadesNew: any[] = [];

  habilidades: any[] =[];
  habilidades2: any[] = [];
  habilidades3: any[] = [];
  creatura: any;
  idCreatura:any;
  
  tipos1: any[] = [];
  tipos2: any[] = [];
  tipos3: any[] = [];

  cargarTipos(){
    this.connector.getTipos().subscribe(data => {
      console.log(data);
      this.tipos1 = [...data];
      this.tipos2 = [...data];
      this.tipos3 = [...data];

      if(!(this.creatura.tipo2?.id_tipo > 0)){
        //console.log("//////////////////////////////////////////cargarTipos//////////////////////////////////////////");
        //console.log(this.creatura.tipo2);
        this.creatura.tipo2 = this.typeNull;
      }else{
        this.tipos2.push(this.typeNull);
        this.tipos3.push(this.typeNull);
      }
      this.limpiarListaDeTipos()
    })
  }

  limpiarListaDeTipos(){
    console.log(this.tipos1);
    console.log(this.creatura);
    
    const idTipo1 = this.creatura.tipo1?.id_tipo;
    const idTipo2 = this.creatura.tipo2?.id_tipo;
    
    this.tipos1 = this.tipos1.filter(tipo => tipo.id_tipo !== idTipo1 && tipo.id_tipo !== idTipo2);
    this.tipos2 = this.tipos2.filter(tipo => tipo.id_tipo !== idTipo1 && tipo.id_tipo !== idTipo2);

  }

  mostrarCreatura2():Promise<void> {
    return new Promise((resolve, reject) => {
      this.connector.getCreaturaConTipos(this.idCreatura).subscribe(data => {
        console.log(data);

          this.creatura = {
            id_creatura: data.creatura.id_creatura,
            nombre_creatura: data.creatura.nombre_creatura,
            id_tipo1: data.creatura.id_tipo1,
            id_tipo2: data.creatura.id_tipo2,
            descripcion: data.creatura.descripcion,
            publico:data.creatura.publico,
            hp: data.creatura.hp,
            atk: data.creatura.atk,
            def: data.creatura.def,
            spa: data.creatura.spa,
            sdef: data.creatura.sdef,
            spe: data.creatura.spe,
            creador: data.creatura.creador,
            imagen: data.creatura.imagen,
            tipo1:{
              id_tipo: data.creatura.tipo1.id_tipo,
              nombre_tipo: data.creatura.tipo1.nombre_tipo,
              color: data.creatura.tipo1.color,
              icono: data.creatura.tipo1.icono,
              creador: data.creatura.tipo1.creador,
            },
            tipo2:{
              id_tipo: data.creatura.tipo2.id_tipo,
              nombre_tipo: data.creatura.tipo2.nombre_tipo,
              color: data.creatura.tipo2.color,
              icono: data.creatura.tipo2.icono,
              creador: data.creatura.tipo2.creador,
            }
          };
          this.imagenCreatura = this.creatura.imagen;
          //this.creatura = data;
          resolve();
      });
    });
  }

  mostrarHabilidades(){
    this.connector.getMoveset(this.idCreatura).subscribe(data => {
      console.log("get Moveset");
      console.log(data);
      this.movesets = data.habilidades;
    })
  }

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }

  ngOnInit(): void {
  
    this.tipo3 = this.typeNull;
    this.route.queryParams.subscribe(
      params => {
        this.idCreatura = params['idCreatura'];

        this.mostrarCreatura2().then((resolve:any) => {
          this.cargarTipos();
          var publicoPosta = false;
          if(this.creatura.publico === 1){
            publicoPosta = true;
          }
          this.datosCreaturaForm.patchValue({
            hp: this.creatura.hp, 
            atk: this.creatura.atk,
            def: this.creatura.def,
            sdef: this.creatura.sdef,
            satk: this.creatura.spa,
            spe: this.creatura.spe,
            descripcion: this.creatura.descripcion,
            nombre: this.creatura.nombre_creatura,
            publicoToken: publicoPosta
          });

        });
        this.mostrarHabilidades();
        this.habilideishon();
      }
    )}

  seleccionarTipo1(tipo: any): void {
    this.creatura.tipo1 = tipo;
    this.cargarTipos();

  }
  seleccionarTipo2(tipo: any): void {
    this.creatura.tipo2 = tipo;
    this.cargarTipos();

  }
  seleccionartipo3(tipo: any): void {
    this.tipo3 = tipo;
    this.habilideishon();


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



  eliminarHabilidad(movesetAeli:any){
    this.movesetsEli.push(movesetAeli);
    //this.movesets.splice(movesetAeli.id_moveset,1);
    this.movesets = this.movesets.filter(movesett => movesett.id_habilidad !== movesetAeli.id_habilidad);
    console.log(this.movesets);
    console.log(this.movesetsEli);

    this.habilideishon();
  }
  cargarHabilidades(){
    this.connector.getHabilidadesConTipos().subscribe(data => {
      console.log("getHabilidades");
      console.log(data);
      this.habilidades = data;
    })
  }
  cargarHabilidades2():Promise<void> {
    return new Promise((resolve, reject) => {
      this.connector.getHabilidadesConTipos().subscribe(data => {
        console.log("getHabilidades");
        console.log(data.habilidades);
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
      });
    }else{
      this.cargarTipos();
    this.listarHabilidadesPorTipos(this.tipo3.id_tipo).then((resolve:any) => {
      this.limpiarListaHabilidades();
    });
    }
  }
  agregarHabilidad(habilidadd:any){
     this.habilidades = this.habilidades.filter(habilidad => habilidad.id_habilidad !== habilidadd.id_habilidad);
     this.habilidadesNew.push(habilidadd);
  }
  eliminarHabilidadDeNew(habilidadd:any){
    this.habilidadesNew = this.habilidadesNew.filter(habilidad => habilidad.id_habilidad !== habilidadd.id_habilidad);
    this.seleccionartipo3(this.tipo3);
    this.habilidades.push(habilidadd);
 }
 genuinamenteAgregar(){
      this.habilidadesNew.forEach(element => {

        this.movesets.push(element);
        console.log(this.movesets);
      });

      ////////////////////////////////////////////////////////
      this.habilidadesNew = [];
      //this.genuinaGenuinamenteAgregar();
      console.log(this.movesets);
    //moveset.habilidad.nombre_habilidad

 }
 genuinaGenuinamenteAgregar(){
  var hpNew = this.datosCreaturaForm.get('hp')?.value;
  var atkNew = this.datosCreaturaForm.get('atk')?.value;
  var defNew = this.datosCreaturaForm.get('def')?.value;
  var sdefNew = this.datosCreaturaForm.get('sdef')?.value;
  var spaNew = this.datosCreaturaForm.get('satk')?.value;
  var speNew = this.datosCreaturaForm.get('spe')?.value;
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
   
    var publicoPosta = 0;
    if(this.datosCreaturaForm.get('publicoToken')?.value){
      publicoPosta = 1;
    }

    const newCretura = {
      id_creatura: this.creatura.id_creatura,
      nombre_creatura: this.datosCreaturaForm.get('nombre')?.value,
      hp:   hpNew,
      atk:  atkNew,
      def:  defNew,
      sdef: sdefNew,
      spa:  spaNew,
      spe:  speNew,
      descripcion: this.datosCreaturaForm.get('descripcion')?.value,
      id_tipo1: this.creatura.tipo1.id_tipo,
      id_tipo2: this.creatura.tipo2.id_tipo,
      imagen: this.imagenCreatura,
      publico: publicoPosta,
      creador: this.creatura.creador,
      habilidades: this.movesets
  }
    console.log("Modificada Creatura:");
    console.log(newCretura);

    console.log("Modificada Creatura´s movepool:");
    console.log(this.movesets);
    /////////////////////////////////////

    this.connector.modificarCreatura(newCretura).subscribe({
          next: () => {
            Swal.fire("Modificada", "La creatura ha sido modificada.", "success");
          },
         error: () => {
            Swal.fire("Error", "No se pudo modificar la creatura.", "error");
            
         }
        });
    //cretura, poetico.
  }else{
    Swal.fire("Error", "No se pudo modificar la creatura, faltan campos.", "error");
    this.datosCreaturaForm.markAllAsTouched()
  }
 }
 isInvalid(controlName: string): boolean {
  const control = this.datosCreaturaForm.get(controlName);
  return !!(control && control.invalid && (control.dirty || control.touched));
}
validarRango(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = parseInt(input.value, 10);

  if (value > 255) input.value = '255';
  if (value < 1) input.value = '1';
}
onSubmit(){

}
onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      //if(condicional para la extencion del archivo){
        this.imagenCreatura = reader.result as string;
      //}
      
    };

    reader.readAsDataURL(file); 
    console.log(file);
  }
}
}
