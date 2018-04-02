import {HttpClientModule} from '@angular/common/http';
import { OperationsService } from './../../views/operations/operations.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { TitleComponent } from './nav/title.component';

@NgModule({
  // importar modulos
  imports: [
    CommonModule, HttpClientModule
  ],
  // declarar componentes que pertenecen a este modulo, PRIVATE COMPONENTS
  declarations: [NavComponent, FooterComponent, TitleComponent],
  providers: [OperationsService],
  // exportar componentes de este modulo para que esten disponibles en otro modulo PUBLIC COMPONENTS
  exports: [NavComponent, FooterComponent]
})
export class ComponentsModule { }
