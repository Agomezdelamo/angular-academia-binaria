import { CapturarPeticionesServiceService } from "./capturar-peticiones-service.service";
import { ComponentsModule } from "./components/components.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { StoreService } from "./store.service";
import { TokenInterceptorService } from "./token-interceptor.service";

@NgModule({
  imports: [ComponentsModule, HttpClientModule],
  exports: [ComponentsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CapturarPeticionesServiceService,
      multi: true
    },
    StoreService
  ]
})
export class LibModule {}
