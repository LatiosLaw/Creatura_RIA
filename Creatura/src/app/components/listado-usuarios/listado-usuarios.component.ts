import { Component, OnInit } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-listado-usuarios',
  imports: [RouterLink,CommonModule],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.scss'
})
export class ListadoUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  constructor(private connector: ConeccionService) {}
  
  onImgErrorUsuario(event: Event) {
    const element= event.target as HTMLImageElement;
    element.src = 'defoultUser.png'; // Ruta de imagen por defecto
  }

  ngOnInit(): void {
    this.connector.listarUsuarios().subscribe((res) => {
      this.randomizador(res);
      this.usuarios = res;
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