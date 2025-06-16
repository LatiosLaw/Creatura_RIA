import { Routes } from '@angular/router';
import { GestorCreaturaComponent } from './components/gestor-creatura/gestor-creatura.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoCreaturaComponent } from './components/listado-creatura/listado-creatura.component';
import { LoginComponent } from './components/login/login.component';
import { ModificarCreaturaComponent } from './components/modificar-creatura/modificar-creatura.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full'},
    { path: 'inicio', component: InicioComponent },
    { path: 'gestorCreatura', component: GestorCreaturaComponent },
    {path: 'gestorCreatura/listadoCreatura',component: ListadoCreaturaComponent},
    {path: 'gestorCreatura/modificarCreatura',component: ModificarCreaturaComponent},
    { path: 'gestorCreatura/modificarCreatura/gestorCreatura', component: GestorCreaturaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: PerfilUsuarioComponent }

];
