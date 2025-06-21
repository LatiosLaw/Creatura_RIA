import { Routes } from '@angular/router';
import { GestorCreaturaComponent } from './components/gestor-creatura/gestor-creatura.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoCreaturaComponent } from './components/listado-creatura/listado-creatura.component';
import { LoginComponent } from './components/login/login.component';
import { ModificarCreaturaComponent } from './components/modificar-creatura/modificar-creatura.component';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { ListadoCreaturasSystemComponent } from './components/listado-creaturas-system/listado-creaturas-system.component';
import { AgregarCreaturaComponent } from './components/agregar-creatura/agregar-creatura.component';
import { ExportarCreaturaComponent } from './components/exportar-creatura/exportar-creatura.component';
import { MostrarCreaturaComponent } from './components/mostrar-creatura/mostrar-creatura.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full'},
    { path: 'inicio', component: InicioComponent },
    { path: 'gestorCreatura', component: GestorCreaturaComponent },
    {path: 'listadoCreatura',component: ListadoCreaturaComponent},
    {path: 'modificarCreatura',component: ModificarCreaturaComponent},
    { path: 'gestorCreatura/modificarCreatura/gestorCreatura', component: GestorCreaturaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'ver_usuario/:nickname', component: VerUsuarioComponent },
    { path: 'modificar_usuario/:nickname', component: ModificarUsuarioComponent },
    { path: 'listadoUsuarios', component: ListadoUsuariosComponent },
    { path: 'listadoCreaturasSystem', component: ListadoCreaturasSystemComponent },
    { path: 'agregarCreatura', component: AgregarCreaturaComponent },
    { path: 'exportarCreatura', component: ExportarCreaturaComponent },
    { path: 'mostrarCreatura', component: MostrarCreaturaComponent },



];
