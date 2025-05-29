import { Component,OnInit  } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-gestor-creatura',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './gestor-creatura.component.html',
  styleUrl: './gestor-creatura.component.scss'
})
export class GestorCreaturaComponent implements OnInit{
  creaturas: any[] = [];
  constructor(private connector: ConeccionService) {}
  
  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'defoult.jpg'; // Ruta de imagen por defecto
  }
  
  ngOnInit(): void {
    this.connector.listadoCreatura().subscribe((res) => {
      this.creaturas = res;
      console.log(this.creaturas);
    });

}
}