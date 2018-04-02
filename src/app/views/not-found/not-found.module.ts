import { RutasModule } from './../../rutas.module';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule, RutasModule
  ],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent]
})
export class NotFoundModule { }
