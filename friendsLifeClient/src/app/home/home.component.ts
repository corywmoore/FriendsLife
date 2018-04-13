import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin/admin.service';

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

  constructor( private router: Router, private adminService : AdminService) { }

  ngOnInit() {
  }

  next(formData) {
    console.log("formData", formData.value);
    console.log("this", this);
    // debugger;
    this.adminService.logIn(formData.value.username, formData.value.password);
    // this.router.navigate(['friend']);
  }

}
