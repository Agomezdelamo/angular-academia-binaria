import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { StoreService } from "./store.service";

//servicio que intercepta las llamadas para ver cambios en el token y ver que hacer
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private token: string = "";

  constructor(private store: StoreService) {
    this.subscribeToTokenChanges();
  }

  //me suscribo a los cambios del servicio store por si cambia un token, 
  //y si cambia actualizo mi propiedad token para que el token que envio en cada peticion este actualizado.
  private subscribeToTokenChanges() {
    this.store.getUserToken$().subscribe(this.setToken);
  }

  private setToken = token => (this.token = token);

  //metodo que intercepta las llamadas para enviar el token actual en cada llamada que pasa por sus manos.
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //creo la request de auth2, que consiste en un header "Authorization: Bearer NUMtOKEN";
    const authorizationReq = this.setAuthHeader(req);
    //GENERO UNA NUEVA REQUEST CON LA AUTORIZACION Y EL TOKEN SETEADOS
    const handledRequest = next.handle(authorizationReq);
    // Y DEVUELVO LA PETICION
    return handledRequest;
  }
  //RECIBO UNA REQUEST
    //En Angular promueven el uso de funciones y datos inmutables de ahí que nos 
  //obliguen a clonar las cabeceras para modificarlas.
  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    //CONCATENO BEARER Y EL TOKEN
    const authToken = `Bearer ${this.token}`;
    //SETEO LA CABECERA DE AUTH2 CON EL PAR CLAVE VALOR
    const headers = req.headers.set("Authorization", authToken);
    //CLONO LA CABECERA PARA NO MODIFICAR LA DE LA REQUEST ACTUAL
    const authorizedReq = req.clone({ headers });
    //LA DEVUELVO
    return authorizedReq;
  }
}
