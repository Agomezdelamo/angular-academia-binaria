import { CredentialsComponent } from './views/credentials/credentials.component';
import { ListViewComponent } from './views/operations/list/list-view/list-view.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
//importo el tipo route para el array de rutas y el modulo de rutas
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from "./views/home/home.component";
import { NgModule } from "@angular/core";

const rutas: Routes = [
    {path: "", component: HomeComponent},
    {path: "links", component: ListViewComponent},
    {path: "credentials", loadChildren: "./views/credentials/credentials.module#CredentialsModule"},
    {path: "404", component: NotFoundComponent},
    //aqui enruto una direccion que si se invoca descarga un paquete con una serie de componentes, 
    //sirve para no cargar todos los componentes la primera vez que se carga la pagina
    {path: "operations", loadChildren: "./views/operations/operations.module#OperationsModule"},
    {path: "**", redirectTo: "/404"}
]

@NgModule({
    //importo el modulo de rutas pasandole el array de rutas
    imports: [RouterModule.forRoot(rutas)], 
    //y una vez importado y seteadas las rutas lo exporto
    exports: [RouterModule]
})
export class RutasModule {}