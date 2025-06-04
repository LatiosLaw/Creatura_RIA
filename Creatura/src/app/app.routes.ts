import { Routes } from '@angular/router';
import { GestorCreaturaComponent } from './components/gestor-creatura/gestor-creatura.component';
import { ListadoCreaturaComponent } from './components/listado-creatura/listado-creatura.component';


export const routes: Routes = [

    {path: 'gestorCreatura',component: GestorCreaturaComponent},
    {path: 'gestorCreatura/listadoCreatura',component: ListadoCreaturaComponent}


];
