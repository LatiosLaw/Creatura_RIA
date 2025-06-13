import { Component, OnInit } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit{
  creaturas: any[] = [];
  constructor(private connector: ConeccionService) {}

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.png'; // Ruta de imagen por defecto
  }

  ngOnInit(): void {
    this.connector.listadoCreaturaConTipos().subscribe((res) => {
      this.randomizador(res);
      this.creaturas = res.slice(0, 20); //limitador
      console.log(this.creaturas);
    });
  }

  private randomizador(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
  }

}
