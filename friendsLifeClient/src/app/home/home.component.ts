import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  state: string = '';
  error: any;
  username: string = '';
  password: string = '';

  constructor( private router: Router) { }

  ngOnInit() {
  }

  next(formData) {
    console.log("formData", formData.value);
    console.log("this", this);
    this.router.navigate(['friend']);
  }

}
