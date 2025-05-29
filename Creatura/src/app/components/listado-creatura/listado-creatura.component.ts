import { Component,OnInit  } from '@angular/core';
import { ConeccionService } from '../../serviceses/coneccion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-creatura',
  imports: [CommonModule],
  templateUrl: './listado-creatura.component.html',
  styleUrl: './listado-creatura.component.scss'
})
export class ListadoCreaturaComponent implements OnInit{
  creaturas: any[] = [];
  constructor(private connector: ConeccionService) {}


  ngOnInit(): void {
    this.connector.listadoCreatura().subscribe((res) => {
      this.creaturas = res;
      console.log(this.creaturas);
    });
    
}
}
