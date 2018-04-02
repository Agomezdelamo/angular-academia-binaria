import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Operation } from '../../operation';

@Component({
  selector: 'app-new-operation',
  templateUrl: './new-operation.component.html',
  styleUrls: ['./new-operation.component.css']
})
export class NewOperationComponent implements OnInit {
  public listaTiposOperacion = ["Income", "Expense"];
  public operation: Operation = new Operation();
  @Output() public quieroSalvarUnaOperacion: EventEmitter<Operation> = new EventEmitter(); 

  constructor() { }

  ngOnInit() {
  }

  //metodo que recibe el formulario al hacer submit en la vista
  enviarFormulario(formu: NgForm){
    console.log('Envio de formulario con exito');
    console.log(formu);
    if(!formu.form.valid) {
      alert("el formulario esta incompleto");
    } else {
      this.operation.descripcion = formu.form.value.inputDescription;
      console.log("descripcion de la operacion"+this.operation.descripcion);
    }
  }

  saveOperation() {
    console.log("salvar desde hijo");
    this.quieroSalvarUnaOperacion.emit(this.operation);
    this.operation = new Operation();
  }

}
