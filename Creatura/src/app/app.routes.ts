import { Routes } from '@angular/router';
import { GestorCreaturaComponent } from './components/gestor-creatura/gestor-creatura.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoCreaturaComponent } from './components/listado-creatura/listado-creatura.component';


export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full'},
    { path: 'inicio', component: InicioComponent },
    { path: 'gestorCreatura', component: GestorCreaturaComponent },
    { path: 'listadoCreatura', component: ListadoCreaturaComponent }


];
