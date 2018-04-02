import { HttpErrorResponse } from '@angular/common/http';
import { OperationsService } from './../../operations.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Operation } from './../../operation';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  public operacion: Operation;
  public operations:Operation[];
  public message:string;
  private id:string;
  constructor(
    private currentRequest: ActivatedRoute,
    private operationsService: OperationsService
  ) { }
  
  ngOnInit() {
    const param =  this.currentRequest.snapshot.params["operacionId"];
   this.operationsService.getOperationsList$().subscribe(this.traerListas.bind(this),this.errorPeticion.bind(this));
    console.log("la lista" + this.operations + "el parametro de entrada" + param);
    this.id = this.currentRequest.snapshot.params['operacionId'];
    this.operationsService.getOperationById$(this.id).subscribe(this.traerOperacion.bind(this), this.errorPeticion.bind(this));
    console.log(this.operacion);

  }

  public traerListas(oper:Operation[]) {
    this.operations = oper;
  }
  public traerOperacion(oper:Operation) {
    this.operacion = oper;
  }
  public errorPeticion(err) {
    if(err instanceof HttpErrorResponse) {
      this.message = `Hay un error http ${err.status}, con este texto ${err.statusText}`;
    } else {
      this.message = `Error desconocido ${err.statusText}`;
    }
  }

}
