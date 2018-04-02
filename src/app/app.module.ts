import { CapturarPeticionesServiceService } from './lib/capturar-peticiones-service.service';
import { ListViewComponent } from './views/operations/list/list-view/list-view.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { NotFoundModule } from './views/not-found/not-found/not-found.module';
import { RutasModule } from './rutas.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ComponentsModule } from './lib/components/components.module';


import { AppComponent } from './app.component';
import { HomeModule } from './views/home/home.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent, NotFoundComponent, ListViewComponent
  ],
  imports: [
    //si importas un modulo, como HomeModule, todos sus componentes públicos los tienes disponibles, en este caso,
    // puedo pintar <app-home></app-home> en la vista del componente principal
    BrowserModule, ComponentsModule, HomeModule,  NotFoundModule, RutasModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CapturarPeticionesServiceService,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
