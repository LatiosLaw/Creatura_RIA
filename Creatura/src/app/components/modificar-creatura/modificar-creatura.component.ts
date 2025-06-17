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
  statControl = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(255),
    Validators.pattern('^[0-9]+$') // asegura que sea un número entero
  ]);
  datosCreaturaForm: FormGroup;

  constructor(private connector: ConeccionService, private fb: FormBuilder,private route: ActivatedRoute) {
    this.datosCreaturaForm = this.fb.group({
      nombre: ['', Validators.required],
      hp: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
      atk: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
      def: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
      sdef: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
      satk: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
      spe: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
      descripcion: ['', Validators.required],

    });
   
  }
  




  movesets: any[] = [];
  movesetsEli: any[] = [];
  habilidadesNew: any[] = [];
  habilidades: any[] =[];
  creatura: any;
  idCreatura:any;

  tipos1: any[] = [];
  tipos2: any[] = [];

  cargarTipos(){
    this.connector.getTipos().subscribe(data => {
      console.log(data);
      this.tipos1 = data;
      this.tipos2 = data;
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
          this.creatura = data;
          resolve();
      });
    });
  }

  mostrarHabilidades(){
    this.connector.getMoveset(this.idCreatura).subscribe(data => {
      console.log("get Moveset");
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

        this.mostrarCreatura2().then((resolve:any) => {
          this.cargarTipos();
        });
        this.mostrarHabilidades();
        this.habilideishon();
      }
    )
    this.datosCreaturaForm.setValue({
      nombre: this.creatura.nombre ,
      hp: this.creatura.hp,
      atk: this.creatura.atk,
      def: this.creatura.def,
      sdef: this.creatura.sdef,
      satk: this.creatura.satk,
      spe: this.creatura.spe,
      descripcion: this.creatura.descripcion
    });

    this.datosCreaturaForm = this.fb.group({
        nombre: ['', Validators.required],
        hp: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
        atk: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
        def: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
        sdef: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
        satk: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
        spe: ['', Validators.required,Validators.min(1),Validators.max(255), Validators.pattern('^[0-9]+$')],
        descripcion: ['', Validators.required],
    });
    this.datosCreaturaForm.patchValue({
      hp: 123
    });



  }

  seleccionarTipo1(tipo: any): void {
    this.creatura.tipo1 = tipo;
    this.cargarTipos();

  }
  seleccionarTipo2(tipo: any): void {
    this.creatura.tipo2 = tipo;
    this.cargarTipos();

  }

  eliminarHabilidad(movesetAeli:any){
    this.movesetsEli.push(movesetAeli);
    //this.movesets.splice(movesetAeli.id_moveset,1);
    this.movesets = this.movesets.filter(movesett => movesett.id_moveset !== movesetAeli.id_moveset);
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
        console.log(data);
        this.habilidades = data;
        resolve();
      })
    });
  }


  limpiarListaHabilidades(){

    this.movesets.forEach(element => {
      this.habilidades = this.habilidades.filter(habilidad => habilidad.id_habilidad !== element.habilidad.id_habilidad);
    });
  }
  habilideishon(){
    this.cargarHabilidades2().then((resolve:any) => {
      this.limpiarListaHabilidades();
    });
  }
  agregarHabilidad(habilidadd:any){
     this.habilidades = this.habilidades.filter(habilidad => habilidad.id_habilidad !== habilidadd.id_habilidad);
     this.habilidadesNew.push(habilidadd);
  }
  eliminarHabilidadDeNew(habilidadd:any){
    this.habilidadesNew = this.habilidadesNew.filter(habilidad => habilidad.id_habilidad !== habilidadd.id_habilidad);
    this.habilidades.push(habilidadd);
 }
 genuinamenteAgregar(){
      this.habilidadesNew.forEach(element => {
        const idMaximo = Math.max(...this.movesets.map(m => m.id_moveset));
        const newId = idMaximo + 1;

        const newMoveset = 
        { id_moveset: newId, id_creatura: this.creatura.id_creatura, id_habilidad: element.id_habilidad,

          habilidad: {
            id_habilidad: element.id_habilidad,
            nombre_habilidad: element.nombre_habilidad,
            id_tipo_habilidad: element.id_tipo_habilidad,
            descripcion: element.descripcion,
            categoria_habilidad: element.categoria_habilidad,
            potencia: element.potencia,
            creador: element.creador
          },
          tipo: {
            id_tipo: element.tipo.id_tipo,
            nombre_tipo: element.tipo.nombre_tipo,
            color: element.tipo.color,
            icono: element.tipo.icono,
            creador: element.tipo.creador
          }

         }
        
        this.movesets.push(newMoveset);
        console.log(this.movesets);
      });
      this.habilidadesNew = [];
      this.genuinaGenuinamenteAgregar();
      console.log(this.movesets);
    //moveset.habilidad.nombre_habilidad

 }
 genuinaGenuinamenteAgregar(){

 }
 isInvalid(controlName: string): boolean {
  const control = this.datosCreaturaForm.get(controlName);
  return !!(control && control.invalid && (control.dirty || control.touched));
}
validarRango(event: Event) {
 /* const input = event.target as HTMLInputElement;
  const value = parseInt(input.value, 10);

  if (value > 255) input.value = '255';
  if (value < 1) input.value = '1';*/
}


}
