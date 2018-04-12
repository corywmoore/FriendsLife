import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  state: string = '';
  error: any;
  students = [];
  userName: string;
  student: string;
  firstname: string;
  lastname: string;
  nickname: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  studentSelect(formData) {
    console.log("formData", formData.value);
    console.log("this", this);
    this.router.navigate(['availability']);
  }

  studentAdd(formData) {
    console.log("formData", formData.value);
    console.log("this", this);
    this.router.navigate(['availability']);    
  }
}
