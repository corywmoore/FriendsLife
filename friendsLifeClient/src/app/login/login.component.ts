import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  state: string = '';
  error: any;
  students = [];
  student: string;
  firstname: string;
  lastname: string;
  nickname: string;

  constructor() { }

  ngOnInit() {
  }

  studentSelect(formData) {
    console.log("formData", formData.value);
    console.log("this", this);
  }

  studentAdd(formData) {
    console.log("formData", formData.value);
    console.log("this", this);
  }
}
