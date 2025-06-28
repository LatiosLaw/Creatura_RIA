import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
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

@Component({
  selector: 'app-mostrar-creatura',
  imports: [RouterOutlet, RouterLink, CommonModule, ReactiveFormsModule, FormsModule, NgOptimizedImage, BarraGestorCreaturaComponent, PiePaginaComponent],
  templateUrl: './mostrar-creatura.component.html',
  styleUrl: './mostrar-creatura.component.scss'
})
export class MostrarCreaturaComponent implements OnInit, AfterViewInit {
  // @ViewChildren selecciona elementos del DOM con la referencia local '#statBar'
  @ViewChildren('statBar') statBars!: QueryList<ElementRef>;

  constructor(
    private connector: ConeccionService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // Inyecta ChangeDetectorRef
  ) {
    const usuarioData = localStorage.getItem('usuarioActual');
    if (usuarioData) {
      this.usuarioActual = JSON.parse(usuarioData);
    }
  }

  creatura: any;
  barraRateBlock: boolean = false;
  idCreatura: any;
  usuarioActual: any;

  calculoDef: any[] = [];
  calculoDefMuyEff: any[] = [];
  calculoDefEff: any[] = [];
  calculoDefNeu: any[] = [];
  calculoDefNoEff: any[] = [];
  calculoDefMuyNoEff: any[] = [];
  calculoDefInmune: any[] = [];

  movesets: any[] = [];
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  creturaRating = 0;
  typeNull = {
    id_tipo: "0",
    nombre_tipo: "-",
    color: "eaeae5",
    icono: "no.png",
    creador: "tuvieja"
  }

  // Función para obtener el color de la barra según su valor
  getColor(valor: number): string {
    let r, g, b;

    if (valor <= 50) {
      const factor = valor / 50;
      r = 255;
      g = Math.round(165 * factor);
      b = 0;
    } else if (valor <= 80) {
      const factor = (valor - 40) / 40;
      r = 255;
      g = Math.round(175 + (90 * factor));
      b = 0;
    } else if (valor <= 110) {
      const factor = (valor - 80) / 30;
      r = Math.round(255 * (1 - factor));
      g = 255;
      b = 0;
    } else {
      const factor = (valor - 110) / 145;
      r = Math.round(0 + (100 * factor));
      g = Math.round(255 - (35 * factor));
      b = Math.round(0 + (255 * factor));
    }

    return `rgb(${r}, ${g}, ${b})`;
  }

  cargarCreatura2(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connector.getCreaturaConTipos(this.idCreatura).subscribe(data => {
        console.log ("getCreatura");
        console.log(data);
        var tipo2: any;
        if (!data.creatura.id_tipo2) {
          tipo2 = this.typeNull;
        } else {
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
          tipo1: {
            id_tipo: data.creatura.tipo1.id_tipo,
            nombre_tipo: data.creatura.tipo1.nombre_tipo,
            color: data.creatura.tipo1.color,
            icono: data.creatura.tipo1.icono,
            creador: data.creatura.tipo1.creador,
          },
          tipo2: {
            id_tipo: tipo2.id_tipo,
            nombre_tipo: tipo2.nombre_tipo,
            color: tipo2.color,
            icono: tipo2.icono,
            creador: tipo2.creador,
          }
        };
        this.creturaRating = this.creatura.rating;
        resolve();
      });
    });
  }

  cargarCalculoDef() {
    this.connector.getCalculaDef(this.creatura.id_tipo1, this.creatura.id_tipo2.id_tipo).subscribe(data => {
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
    });
  }

  cargarMoveset() {
    this.connector.getMoveset(this.idCreatura).subscribe(data => {
      console.log("get Moveset");
      console.log(data);
      this.movesets = data.habilidades;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.idCreatura = params['idCreatura'];
      }
    );

    // Carga la criatura y, una vez que los datos están disponibles, aplica los estilos de las barras
    this.cargarCreatura2().then(() => {
      this.cargarCalculoDef();
      // Forzar la detección de cambios para asegurar que ViewChildren esté actualizado
      this.cdr.detectChanges();
      this.applyBarStyles(); // Llama a la función para aplicar los estilos
    });

    this.cargarMoveset();

    const datos = {
      id_creatura: this.idCreatura,
      usuario: this.usuarioActual.nickname
    };
    this.chequearSiRateo(datos);
  }

  ngAfterViewInit(): void {
    // Ya no necesitas llamar a applyBarStyles aquí si la estás llamando después de cargarCreatura2().
    // Esto previene posibles condiciones de carrera o ejecuciones dobles.
  }

  // Método para aplicar los estilos de las barras de estadísticas
  applyBarStyles(): void {
    // Asegurarse de que 'creatura' tiene datos antes de intentar acceder a ellos
    if (!this.creatura) {
      console.warn('Los datos de la criatura no están disponibles para aplicar estilos a las barras.');
      return;
    }

    this.statBars.forEach(element => {
      const barra = element.nativeElement;
      const type = barra.getAttribute('data-type');
      const maxValue = parseInt(barra.getAttribute('data-max-value'));
      let value: number;

      // Asigna el valor correcto de la estadística basado en el data-type
      switch (type) {
        case 'HP':
          value = this.creatura.hp;
          break;
        case 'ATK':
          value = this.creatura.atk;
          break;
        case 'DEF':
          value = this.creatura.def;
          break;
        case 'SPA':
          value = this.creatura.spa;
          break;
        case 'SDEF':
          value = this.creatura.sdef;
          break;
        case 'SPE':
          value = this.creatura.spe;
          break;
        default:
          value = 0; // Valor por defecto si el tipo no coincide
          console.warn(`Tipo de estadística desconocido: ${type}`);
          break;
      }

      if (value !== undefined && maxValue > 0) {
        const porcentaje = (value / maxValue) * 100;
        const barraInner = barra.querySelector('.barra-inner');
        if (barraInner) {
          (barraInner as HTMLElement).style.width = porcentaje + '%';
          (barraInner as HTMLElement).style.backgroundColor = this.getColor(value);
        }
      }
    });
  }

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }

  ratingMomento(value: number): void {
    if (!this.barraRateBlock) {
      this.barraRateBlock = true;
      this.rating = value;

      const datos = {
        id_creatura: this.idCreatura,
        usuario: this.usuarioActual.nickname,
        puntaje: this.rating
      };
      this.connector.modificarCalificacion(datos).subscribe(params => {
        this.creturaRating = params.puntaje;
      });
      console.log('Rating seleccionado:', this.rating);
    }
  }

  chequearSiRateo(datos: any) {
    this.connector.chequearSiRateo(datos).subscribe(params => {
      console.log("rateo chequeacion momento");
      console.log(params);
      if (params.ok == 0) {
        this.barraRateBlock = false;
      } else {
        console.log(params.ok.estrellas);
        this.barraRateBlock = true;
        this.rating = params.ok.estrellas;
      }
    });
  }
}