import { OperationsService } from './operations.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Operation } from './operation';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  public numberOfOperations = 0;
  public operations: Operation[] = [];
  public hayLista = false;
  public message: string;
  public fullError:any;

  constructor(private operationService: OperationsService) { }

  ngOnInit() {
    this.refreshData();
  }

  private refreshData() {
    this.message = `Refreshing Data`;
    this.fullError = null;
    this.operationService
      .getOperationsList$()
      .subscribe(this.showOperations.bind(this), this.catchError.bind(this));
    this.operationService
      .getNumberOfOperations$()
      .subscribe(this.showCount.bind(this), this.catchError.bind(this));
  }

  private showOperations(operations: Operation[]) {
    console.log("refrescando las operaciones", operations);
    this.operations = operations;
    this.message = `operations Ok`;
  }
  private showCount(data: any) {
    this.numberOfOperations = data.count;
    this.message = `count Ok`;
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.message = `Http Error: ${err.status}, text: ${err.statusText}`;
    } else {
      this.message = `Unknown error, text: ${err.message}`;
    }
    this.fullError = err;
  }




  public salvar(_operacion: Operation) {
    console.log("salvar en padre",_operacion);
    this.operationService.saveOperation$(_operacion).subscribe(data => this.refreshData());
    if(this.numberOfOperations > 0) {
       this.hayLista = true;
    }
    this.refreshData();
  }
  
  public borrar(_operacion: Operation) {
    console.log("borrar en el padre");
    this.operationService.deleteOperation$(_operacion).subscribe(data => this.refreshData());
    this.refreshData();
  }

}
