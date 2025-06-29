import { Component, OnInit } from '@angular/core';
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
import { PageEvent } from '@angular/material/paginator';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatPaginatorIntl } from '@angular/material/paginator';

import { customPaginator } from '../../../cosas/matPag';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-modificar-creatura',
  imports: [RouterOutlet, RouterLink, CommonModule, ReactiveFormsModule, FormsModule, MatPaginatorModule, NgOptimizedImage, BarraGestorCreaturaComponent, PiePaginaComponent],
  templateUrl: './modificar-creatura.component.html',
  styleUrl: './modificar-creatura.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class ModificarCreaturaComponent implements OnInit {
  datosCreaturaForm: FormGroup;
  typeNull = {
    id_tipo: "0",
    nombre_tipo: "-",
    color: "fffff",
    icono: "no.png",
    creador: "tuvieja"
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private connector: ConeccionService, private fb: FormBuilder, private route: ActivatedRoute) {
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
  usuarioActual: any;
  imagenCreatura = "defoult.jpg";
  imagenCreatura2: any;
  movesets: any[] = [];
  movesets2: any[] = [];
  tipo3: any;
  movesetsEli: any[] = [];
  habilidadesNew: any[] = [];

  habilidades: any[] = [];
  habilidades2: any[] = [];
  habilidadesFiltradas: any[] = [];

  calculoDef: any[] = [];
  calculoDefMuyEff: any[] = [];
  calculoDefEff: any[] = [];
  calculoDefNeu: any[] = [];
  calculoDefNoEff: any[] = [];
  calculoDefMuyNoEff: any[] = [];
  calculoDefInmune: any[] = [];

  paginadas: any[] = [];
  estarIndecs = 0;
  paginaActual = 0;
  tamaPagina = 8;

  terminoBusqueda = "";

  creatura: any;
  idCreatura: any;

  puntoLength = 0;

  tipos1: any[] = [];
  tipos2: any[] = [];
  tipos3: any[] = [];

  ngOnInit(): void {
    this.tipo3 = this.typeNull;
    this.route.queryParams.subscribe(
      params => {
        this.idCreatura = params['idCreatura'];

        this.mostrarCreatura2().then(() => {
          this.cargarTipos();
          this.cargarCalculoDef();
          let publicoPosta = false;
          if (this.creatura.publico === 1) {
            publicoPosta = true;
          }
          // Usamos patchValue para establecer los valores iniciales.
          // Angular se encargará de vincularlos a ambos inputs.
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
    )
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.tamaPagina = event.pageSize;
    this.actualizarListaPaginada();
  }
  actualizarListaPaginada() {
    this.puntoLength = this.habilidades.length;
    const start = this.paginaActual * this.tamaPagina;
    const end = start + this.tamaPagina;
    this.paginadas = this.habilidades.slice(start, end);
  }

  cargarTipos() {
    this.connector.getTipos().subscribe(data => {
      console.log(data);
      this.tipos1 = [...data];
      this.tipos2 = [...data];
      this.tipos3 = [...data];
      this.tipos3.push(this.typeNull);
      if (!(this.creatura.tipo2?.id_tipo > 0)) {
        this.creatura.tipo2 = this.typeNull;
      } else {
        this.tipos2.push(this.typeNull);
      }
      this.limpiarListaDeTipos()
    })
  }

  limpiarListaDeTipos() {
    console.log(this.tipos1);
    console.log(this.creatura);

    const idTipo1 = this.creatura.tipo1?.id_tipo;
    const idTipo2 = this.creatura.tipo2?.id_tipo;

    this.tipos1 = this.tipos1.filter(tipo => tipo.id_tipo !== idTipo1 && tipo.id_tipo !== idTipo2);
    this.tipos2 = this.tipos2.filter(tipo => tipo.id_tipo !== idTipo1 && tipo.id_tipo !== idTipo2);
  }

  mostrarCreatura2(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connector.getCreaturaConTipos(this.idCreatura).subscribe(data => {
        console.log(data);

        this.creatura = {
          id_creatura: data.creatura.id_creatura,
          nombre_creatura: data.creatura.nombre_creatura,
          id_tipo1: data.creatura.id_tipo1,
          id_tipo2: data.creatura.id_tipo2,
          descripcion: data.creatura.descripcion,
          publico: data.creatura.publico,
          hp: data.creatura.hp,
          atk: data.creatura.atk,
          def: data.creatura.def,
          spa: data.creatura.spa,
          sdef: data.creatura.sdef,
          spe: data.creatura.spe,
          creador: data.creatura.creador,
          imagen: data.creatura.imagen,
          tipo1: {
            id_tipo: data.creatura.tipo1.id_tipo,
            nombre_tipo: data.creatura.tipo1.nombre_tipo,
            color: data.creatura.tipo1.color,
            icono: data.creatura.tipo1.icono,
            creador: data.creatura.tipo1.creador,
          },
          tipo2: {
            id_tipo: data.creatura.tipo2.id_tipo,
            nombre_tipo: data.creatura.tipo2.nombre_tipo,
            color: data.creatura.tipo2.color,
            icono: data.creatura.tipo2.icono,
            creador: data.creatura.tipo2.creador,
          }
        };
        this.imagenCreatura = this.creatura.imagen;
        resolve();
      });
    });
  }

  mostrarHabilidades() {
    this.connector.getMoveset(this.idCreatura).subscribe(data => {
      console.log("get Moveset");
      console.log(data);
      this.movesets = data.habilidades;
    })
  }
  cargarCalculoDef() {
    this.connector.getCalculaDef(this.creatura.tipo1.id_tipo, this.creatura.tipo2.id_tipo).subscribe(data => {
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
        if (element.multiplicador === 0) {
          this.calculoDefInmune.push(element);
        } else if (element.multiplicador === 1) {
          this.calculoDefNeu.push(element);
        } else if (element.multiplicador === 2) {
          this.calculoDefEff.push(element);
        } else if (element.multiplicador === 4) {
          this.calculoDefMuyEff.push(element);
        } else if (element.multiplicador === 0.5) {
          this.calculoDefNoEff.push(element);
        } else if (element.multiplicador === 0.25) {
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
  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }

  seleccionarTipo1(tipo: any): void {
    this.creatura.tipo1 = tipo;
    this.cargarTipos();
    this.cargarCalculoDef();

  }
  seleccionarTipo2(tipo: any): void {
    this.creatura.tipo2 = tipo;
    this.cargarTipos();
    this.cargarCalculoDef();

  }
  seleccionartipo3(tipo: any): void {
    this.tipo3 = tipo;
    this.paginaActual = 0;
    this.tamaPagina = 8;
    this.paginator.pageIndex = 0;
    this.habilideishon();
  }
  listarHabilidadesPorTipos(tipo: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connector.getHabilidadesPorTipo(tipo).subscribe(data => {
        console.log("getHabilidades por TIPO");
        console.log(data.habilidades);
        console.log(this.tipo3);
        this.habilidades2 = data.habilidades;
        this.puntoLength = this.habilidades.length;
        this.habilidades = data.habilidades;
        resolve();
      })
    });
  }

  eliminarHabilidad(movesetAeli: any) {
    this.movesetsEli.push(movesetAeli);
    this.movesets = this.movesets.filter(movesett => movesett.id_habilidad !== movesetAeli.id_habilidad);
    console.log(this.movesets);
    console.log(this.movesetsEli);

    this.habilideishon();
  }
  cargarHabilidades() {
    this.connector.getHabilidadesConTipos().subscribe(data => {
      console.log("getHabilidades");
      console.log(data);
      this.habilidades = data;
    })
  }
  cargarHabilidades2(): Promise<void> {
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

  limpiarListaHabilidades() {
    this.movesets.forEach(element => {
      this.habilidades = this.habilidades.filter(habilidad => habilidad.id_habilidad !== element.id_habilidad);
    });
    this.habilidadesNew.forEach(element => {
      this.habilidades = this.habilidades.filter(habilidad => habilidad.id_habilidad !== element.id_habilidad);
    });
  }
  habilideishon() {
    if (this.tipo3.id_tipo === "0") {
      this.cargarHabilidades2().then(() => {
        this.limpiarListaHabilidades();
        this.filtrarHabilidadesPorTexto()
        this.actualizarListaPaginada();
        this.habilidades2 = [...this.habilidades];
      });
    } else {
      this.cargarTipos();
      this.listarHabilidadesPorTipos(this.tipo3.id_tipo).then(() => {
        this.limpiarListaHabilidades();
        this.filtrarHabilidadesPorTexto()
        this.actualizarListaPaginada();
      });
    }
  }
  agregarHabilidad(habilidadd: any) {
    this.habilidades = this.habilidades.filter(habilidad => habilidad.id_habilidad !== habilidadd.id_habilidad);
    this.habilidadesNew.push(habilidadd);
    this.actualizarListaPaginada();
  }
  eliminarHabilidadDeNew(habilidadd: any) {
    this.habilidadesNew = this.habilidadesNew.filter(habilidad => habilidad.id_habilidad !== habilidadd.id_habilidad);
    this.seleccionartipo3(this.tipo3);
    this.habilidades.push(habilidadd);
  }
  genuinamenteAgregar() {
    this.habilidadesNew.forEach(element => {
      this.movesets.push(element);
      console.log(this.movesets);
    });
    this.habilidadesNew = [];
    console.log(this.movesets);
  }

  // --- MODIFICACIÓN CLAVE AQUÍ ---
  validarRango(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const formControlName = inputElement.getAttribute('formControlName');

    if (!formControlName) {
        console.warn("No se encontró formControlName en el elemento.");
        return;
    }

    let value = parseInt(inputElement.value, 10);

    // Asegurarse de que el valor sea un número, si no, establecerlo a 1
    if (isNaN(value)) {
        value = 1;
    }

    // Aplicar las restricciones de rango
    if (value < 1) {
        value = 1;
    } else if (value > 255) {
        value = 255;
    }

    // Si el valor actual del input es diferente al valor corregido, actualízalo visualmente.
    // Esto es importante para que el usuario vea la corrección al instante.
    if (parseInt(inputElement.value, 10) !== value) {
        inputElement.value = value.toString();
    }
    
    // Establece el valor corregido en el FormControl.
    // Esto es lo que sincroniza ambos inputs.
    // No necesitamos { emitEvent: false } aquí porque esta función se llama directamente
    // desde el evento 'input' de los elementos, y queremos que el FormControl
    // se actualice y propague el cambio al input de rango.
    this.datosCreaturaForm.get(formControlName)?.setValue(value);
  }

  // Esta función 'validarRangoFormControl' se vuelve menos necesaria,
  // ya que la lógica principal ahora está en 'validarRango' que se dispara en el 'input'.
  // Podrías eliminarla si el único lugar donde se usa es si te suscribes a valueChanges
  // para revalidar, pero con el 'input' directamente sobre los elementos, ya no es tan crítico.
  // La mantengo por si la usas en otro lado o por si prefieres tener la lógica de validación
  // separada para reuso.
  // Sin embargo, las suscripciones en ngOnInit a valueChanges para llamar a esta función
  // ya NO son necesarias porque la sincronización es bidireccional mediante el mismo FormControl.
  validarRangoFormControl(controlName: string, value: number) {
    let newValue = value;

    if (isNaN(newValue)) {
      newValue = 1;
    }

    if (newValue < 1) {
      newValue = 1;
    } else if (newValue > 255) {
      newValue = 255;
    }

    // Solo si el valor necesita ser corregido, actualiza el FormControl.
    // Usar { emitEvent: false } aquí es importante SI ESTA FUNCIÓN FUERA LLAMADA
    // POR UN valueChanges para evitar recursión.
    // Dado que el flujo principal será a través de 'validarRango' en el HTML,
    // esta función podría no ser necesaria en este componente.
    if (newValue !== value) {
      this.datosCreaturaForm.get(controlName)?.setValue(newValue, { emitEvent: false });
    }
  }


  genuinaGenuinamenteAgregar() {
    // Si la descripción está vacía, asegúrate de que sea una cadena vacía, no null.
    if (!this.datosCreaturaForm.get('descripcion')?.value) {
      this.datosCreaturaForm.patchValue({ descripcion: "" });
    }

    // Los validators del FormGroup ya se encargan de si el formulario es válido o no
    // basándose en los rangos y 'required'.
    if (this.datosCreaturaForm.valid) {
      let publicoPosta = 0;
      if (this.datosCreaturaForm.get('publicoToken')?.value) {
        publicoPosta = 1;
      }

      // Los valores ya son obtenidos directamente y correctamente del formulario.
      const newCretura = {
        id_creatura: this.creatura.id_creatura,
        nombre_creatura: this.datosCreaturaForm.get('nombre')?.value,
        hp: this.datosCreaturaForm.get('hp')?.value,
        atk: this.datosCreaturaForm.get('atk')?.value,
        def: this.datosCreaturaForm.get('def')?.value,
        sdef: this.datosCreaturaForm.get('sdef')?.value,
        spa: this.datosCreaturaForm.get('satk')?.value, // Asumiendo que 'satk' del form es 'spa' en tu objeto de creatura
        spe: this.datosCreaturaForm.get('spe')?.value,
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

      this.connector.modificarCreatura(newCretura).subscribe({
        next: () => {
          Swal.fire("Modificada", "La creatura ha sido modificada.", "success");
        },
        error: (err) => {
          console.error("Error al modificar la creatura:", err);
          Swal.fire("Error", "No se pudo modificar la creatura.", "error");
        }
      });
    } else {
      Swal.fire("Error", "No se pudo modificar la creatura, faltan campos o los valores están fuera de rango.", "error");
      this.datosCreaturaForm.markAllAsTouched()
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.datosCreaturaForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    this.genuinaGenuinamenteAgregar();
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
    }
  }
  filtrarHabilidadesPorTexto() {
    this.paginator.pageIndex = 0;
    this.paginaActual = 0;
    this.tamaPagina = 8;
    const terminoMinuscula = this.terminoBusqueda.toLowerCase().trim();
    if (this.terminoBusqueda !== "") {
      this.habilidadesFiltradas = this.habilidades2.filter(habilidad => habilidad.nombre_habilidad.toLowerCase().includes(terminoMinuscula));
      this.habilidades = [...this.habilidadesFiltradas];
      this.limpiarListaHabilidades();
      this.actualizarListaPaginada();
    } else {
      this.habilidades = this.habilidades2;
      this.limpiarListaHabilidades();
      this.actualizarListaPaginada();
    }
  }
}