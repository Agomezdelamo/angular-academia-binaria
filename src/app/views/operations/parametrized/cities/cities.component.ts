import { OperationsService } from './../../operations.service';
import { Operation } from './../../operation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  
  city:string;

  constructor(private rutaActual:ActivatedRoute, private operationService: OperationsService) {
    this.city = rutaActual.snapshot.params["id"];
   }

  ngOnInit() {
  }

}
