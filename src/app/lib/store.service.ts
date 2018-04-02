import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";

//servicio que usa el patron redux, básicamente lo que hace es 
//utilizar la librería RxJs para emitir cambios en el estado de un modelo (objeto POJO); 
//y que otro servicio pueda subscribirse para ser notificado de dichos cambios.
@Injectable()
export class StoreService {
  private state = {
    userToken: "",
    userIsAnonymous: true,
    userMessage: ""
  };

  //GENERO LOS SUBJECTS Y BEHAVIOR SUBJECT
  private userToken$ = new Subject<string>();
  private userIsAnonymous$ = new BehaviorSubject<boolean>(
    this.state.userIsAnonymous
  );
  private userMessage$ = new Subject<string>();

  constructor() {}


  //EXPONGO LOS OBSERVABLES PARA QUE PUEDAN SER PUBLICOS Y TE PUEDAS SUSCRIBIR
  public getUserToken$(): Observable<string> {
    return this.userToken$.asObservable();
  }
  public getUserIsAnonymous$(): Observable<boolean> {
    return this.userIsAnonymous$.asObservable();
  }
  public getUserMessage$(): Observable<string> {
    return this.userMessage$.asObservable();
  }

  //EXPONGO LOS SUBJECTS PARA QUE PUEDAN PRODUCIRSE NUEVAS INSERCIONES DE DATOS DESDE ALGUN SITIO,
  //EN ESTE CASO SE PRODUCE DESDE EL COMPONENTE, QUE CON LA RESPUESTA DEL SERVIDOR, ALIMENTA AL SUBJECT
  //CON UN NUEVO DATO, QUE DESDE AQUI SE EMITE CON NEXT, Y DE ESTA FORMA, TODOS LOS SUSCRITOS A ESTE
  //OBSERVABLE DEL TOKEN, COMO PUEDE SER EL INTERCEPTOR DE PETICIONES, TIENE ACTUALIZADO EL TOKEN QUE ADJUNTA
  //EN CADA LLAMADA.
  public setUserToken(userToken: string) {
    if (userToken) {
      this.state.userToken = userToken;
      this.state.userIsAnonymous = false;
    } else {
      this.state.userToken = "";
      this.state.userIsAnonymous = true;
    }
    this.userToken$.next(this.state.userToken);
    this.userIsAnonymous$.next(this.state.userIsAnonymous);
  }


  public setUserMessage(userMessage: string) {
    this.state.userMessage = userMessage;
    this.userMessage$.next(this.state.userMessage);
  }
}
