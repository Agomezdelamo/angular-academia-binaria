import { Component, OnInit } from "@angular/core";
import { CredentialsService } from "./credentials.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "../../lib/store.service";

@Component({
  selector: "cf-login",
  template: `aaaaaaaaaaaa
  <h2>{{pageData.title}}</h2>
  <form class="container">
    <label for="email">Email</label>
    <input name="email"
      [(ngModel)]="pageData.credential.email"
      type="email"/>
    <label for="password">Password</label>
    <input name="password"
      [(ngModel)]="pageData.credential.password"
      type="password"/>
    <button (click)="sendCredential()">{{ pageData.title }}</button>
    <a [routerLink]="['..',pageData.alternate | lowercase]">{{ pageData.alternate }}</a>
  </form>
  <i>{{ errorMessage }}</i>
  `,
  styles: []
})
export class CredentialsComponent implements OnInit {
  public pageData: any;
  public errorMessage = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private credentialsService: CredentialsService,
    private router: Router,
    private store: StoreService
  ) {}

  public ngOnInit() {
    this.obtainPageDataFromRoute();
  }
  private obtainPageDataFromRoute() {
    this.pageData = this.activatedRoute.snapshot.data;
  }
  public sendCredential() {
    this.errorMessage = "";
    const credential = this.pageData.credential;
    const service = this.pageData.title;
    //mando mis datos, usuario y contraseña al servidor, y me suscribo al resultado del servidor mediante post
    this.credentialsService
      .sendCredential(credential, service)
      .subscribe(this.acceptedCredentials, this.invalidCredentials);
  }

  // si el servidor me deuvelve el  token(vamos, que mi login ha sido correcto y tengo el vale o token que me da el servidor),
  // almaceno el token en el storeService, con lo que al modificar un observable, 
  //el servicio de llamadas se dara cuenta del cambio, y lo podra actualizar en cada llamada, de esta forma,
  //cada vez que pida una pagina a partir de ahora ira con el token y sabre que el usuario esta bien logado
  // y navego.
  private acceptedCredentials = responseData => {
    if (responseData && responseData.token) {
      recibe el token. El subscriptor será el servicio de interceptación TokenInterceptorService que usará dicho token para identificar al usuario actual en todas las llamadas al servidor. Y en el medio está el BusService que actúa de enlace entre ambos. Este es el código necesario en el fichero bus.service.ts:
      //GENERO UN EVENTO NEXT EN EL SUBJECT DEL TOKEN, Y DE ESTA FORMA SE SETEA EN TODAS LAS LLAMADAS.
      this.store.setUserToken(responseData.token);
      this.router.navigateByUrl("/");
    } else {
      this.invalidCredentials();
    }
  };

  //si mi login no es valido seteo el token a null y muestro un mensaje.
  private invalidCredentials = () => {
    this.store.setUserToken(null);
    this.errorMessage = "Invalid Credentials";
  };
}