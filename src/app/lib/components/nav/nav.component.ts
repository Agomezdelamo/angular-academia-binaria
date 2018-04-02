import { OperationsService } from './../../../views/operations/operations.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private operationsService:OperationsService) { }

  ngOnInit() {

  }

}
