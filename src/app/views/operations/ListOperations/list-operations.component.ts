import { Output } from '@angular/core';
import { Operation } from './../operation';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-operations',
  templateUrl: './list-operations.component.html',
  styleUrls: ['./list-operations.component.css']
})
export class listOperationsComponent implements OnInit {
  //recibimos en estos dos input los valores actuales que residen en el componente padre
  @Input() public numberOfOperations = 0;
  @Input() public operations: Operation[] = [];
  @Input() public hayLista  = false;  


  //evento que expresa la intencion de borrar un registro, a la lista del padre
  @Output() public quieroEliminarUnaOperacion:EventEmitter<any>  = new EventEmitter();

  constructor() {}
  ngOnInit() {

  }


  private quieroEliminarAlgo(_operacion) {
    //mando al padre el elemento de la lista que quiero borrar del array
    this.quieroEliminarUnaOperacion.emit(_operacion);
  }

}
