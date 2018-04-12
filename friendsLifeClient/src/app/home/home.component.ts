import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  state: string = '';
  error: any;
  username: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  next(formData) {
    console.log("formData", formData.value);
    console.log("this", this);
  }

}
