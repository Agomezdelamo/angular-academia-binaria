import { ItemComponent } from './item/item/item.component';
import { OperationsComponent } from './operations.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubOperationComponent } from './childs-components/sub-operation/sub-operation.component';
import { CitiesComponent } from './parametrized/cities/cities.component';

//solo accedemos a este enrutador si accedemos a la ruta /operations, y
// una vez aqui, dependiendo de la ruta rediriga a una pagina u otra
const routes: Routes = [
  {path: "", component: OperationsComponent},
  //ruta para un componente parametrizado, cualquier cosa que lleve cities/y algo cargara ese componente
  {path: "cities/:id", component: CitiesComponent},
  {path:"tipo/:operacionId", component: ItemComponent},
  //ruta para un componente especifico
  {path: "sub", component: SubOperationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
