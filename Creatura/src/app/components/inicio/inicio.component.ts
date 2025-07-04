import { Component, OnInit } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink,CommonModule, PiePaginaComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit{
  creaturas: any[] = [];
  usuarios: any[] = [];
  constructor(private connector: ConeccionService) {}

  onImgErrorCreatura(event: Event) {
    const element1 = event.target as HTMLImageElement;
    element1.src = 'defoult.png'; // Ruta de imagen por defecto
  }

  onImgErrorUsuario(event: Event) {
    const element2 = event.target as HTMLImageElement;
    element2.src = 'defoultUser.png'; // Ruta de imagen por defecto
  }

  ngOnInit(): void {
    this.connector.listadoCreaturaConTipos().subscribe((res1) => {

      const filtradas = res1.filter((creatura: any) => creatura.creador === 'SYSTEM');
      this.randomizador(filtradas);
      this.creaturas = filtradas.slice(0, 12); //limitador

      console.log(this.creaturas);
    });

    this.connector.listarUsuarios().subscribe((res2) => {
      this.randomizador(res2);
      this.usuarios = res2.slice(0, 14); //limitador
      console.log(this.usuarios);
    })
  }

  private randomizador(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
  }

}
