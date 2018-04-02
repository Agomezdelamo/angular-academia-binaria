import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsComponent } from './operations.component';
import { SubOperationComponent } from './childs-components/sub-operation/sub-operation.component';
import { CitiesComponent } from './parametrized/cities/cities.component';
import { listOperationsComponent } from './ListOperations/list-operations.component';
import { NewOperationComponent } from './new-operation/new-operation/new-operation.component';
import { FormsModule } from '@angular/forms';
import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsService } from './operations.service';
import { ItemComponent } from './item/item/item.component';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    OperationsRoutingModule
  ],
  declarations: [OperationsComponent, SubOperationComponent, NewOperationComponent, 
      listOperationsComponent,
     CitiesComponent, ItemComponent],
  providers: [OperationsService]
})
export class OperationsModule { }
