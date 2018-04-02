import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";

@Injectable()
export class CapturarPeticionesServiceService implements HttpInterceptor {
  private started;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //puntero al flujo de datos(observable), que es la peticion en curso.
    const manejadorPeticion = next.handle(req);
    const callbackExito = this.interceptResponse.bind(this);
    const callbackError = this.catchError.bind(this);
    this.started = Date.now();
    //con tap(grifo), reaccionamos ante un cambio en el flujo de datos, la peticion,
    //pero no la modificamos, admite 2 funciones de callback.
    const operacionInterceptada = tap<HttpEvent<any>>(callbackExito,callbackError);
    //enganchamos el operador tap(grifo) a la pipe(tuberia) donde se esta ejecutando el flujo de datos(petcion actual)
    return manejadorPeticion.pipe(operacionInterceptada);
  };
  
  constructor(public router: Router) {}
  private interceptResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      const elapsed_ms = Date.now() - this.started;
      console.debug(`Peticion para la url  ${event.url} tardo ${elapsed_ms} ms.`);
    }
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      console.error(err.message);
    }
  }

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      console.log("Not authorized");
      this.catchUnauthorizedAndRedirect();
    } else {
      console.warn(err.statusText);
    }
  }

  private catchUnauthorizedAndRedirect() {
    console.log("not authorized, go to login");
    //cuando llega un 401 que significa no autorizado le llevamos al login
    this.router.navigateByUrl("/credentials/login");
  }
}
