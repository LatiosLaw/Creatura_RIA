import { Component, OnInit } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-listado-creaturas-system',
  imports: [CommonModule,RouterLink],
  templateUrl: './listado-creaturas-system.component.html',
  styleUrl: './listado-creaturas-system.component.scss'
})
export class ListadoCreaturasSystemComponent implements OnInit{
  creaturas: any[] = [];
  usuarios: any[] = [];
  constructor(private connector: ConeccionService) {}

  onImgErrorCreatura(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }

  ngOnInit(): void {
    this.connector.listadoCreaturaConTipos().subscribe((res) => {

      const filtradas = res.filter((creatura: any) => creatura.creador === 'SYSTEM');
      this.randomizador(filtradas);
      this.creaturas = filtradas;
      
    });
  }

  private randomizador(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
  }

}
