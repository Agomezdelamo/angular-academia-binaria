import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ahora = moment().format();
  manana = moment().add(1,"days"); 
  constructor(private router: Router) { 
  }

  goOperations() {
    console.log("operations")
    this.router.navigate(['operations']);
  }

  ngOnInit() {
  }

}
