import { Routes } from '@angular/router';
import { GestorCreaturaComponent } from './components/gestor-creatura/gestor-creatura.component';
import { GestorHabilidadComponent } from './components/gestor-habilidad/gestor-habilidad.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoCreaturaComponent } from './components/listado-creatura/listado-creatura.component';
import { ListadoHabilidadComponent } from './components/listado-habilidad/listado-habilidad.component';
import { LoginComponent } from './components/login/login.component';
import { ModificarCreaturaComponent } from './components/modificar-creatura/modificar-creatura.component';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { ModificarHabilidadComponent } from './components/modificar-habilidad/modificar-habilidad.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { ListadoCreaturasSystemComponent } from './components/listado-creaturas-system/listado-creaturas-system.component';
import { AgregarCreaturaComponent } from './components/agregar-creatura/agregar-creatura.component';
import { AltaHabilidadComponent } from './components/alta-habilidad/alta-habilidad.component';
import { ExportarCreaturaComponent } from './components/exportar-creatura/exportar-creatura.component';
import { MostrarCreaturaComponent } from './components/mostrar-creatura/mostrar-creatura.component';
import { BusqueishonMomenteishonComponent } from './components/busqueishon-momenteishon/busqueishon-momenteishon.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { ListadoTiposComponent } from './components/listado-tipos/listado-tipos.component';
import { ModificarTipoComponent } from './components/modificar-tipo/modificar-tipo.component';
import { AgregarTipoComponent } from './components/agregar-tipo/agregar-tipo.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full'},
    { path: 'inicio', component: InicioComponent },
    { path: 'gestorCreatura', component: GestorCreaturaComponent },
    { path: 'gestorHabilidad', component: GestorHabilidadComponent },
    {path: 'listadoCreatura',component: ListadoCreaturaComponent},
    {path: 'listadoHabilidad',component: ListadoHabilidadComponent},
    {path: 'modificarCreatura',component: ModificarCreaturaComponent},
    {path: 'modificarHabilidad',component: ModificarHabilidadComponent},
    { path: 'gestorCreatura/modificarCreatura/gestorCreatura', component: GestorCreaturaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'ver_usuario/:nickname', component: VerUsuarioComponent },
    { path: 'modificar_usuario/:nickname', component: ModificarUsuarioComponent },
    { path: 'listadoUsuarios', component: ListadoUsuariosComponent },
    { path: 'listadoCreaturasSystem', component: ListadoCreaturasSystemComponent },
    { path: 'agregarCreatura', component: AgregarCreaturaComponent },
    { path: 'agregarHabilidad', component: AltaHabilidadComponent },
    { path: 'exportarCreatura', component: ExportarCreaturaComponent },
    { path: 'mostrarCreatura', component: MostrarCreaturaComponent },
    { path: 'Busqueishon', component: BusqueishonMomenteishonComponent },
    { path: 'ayuda', component: AyudaComponent },
    { path: 'listarTipos' , component: ListadoTiposComponent },
    { path: 'modificarTipo' , component: ModificarTipoComponent },
    { path: 'agregarTipo' , component: AgregarTipoComponent }
];
