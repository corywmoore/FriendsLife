import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { SelectionService } from '../services/selection/selection.service';
import { Friend } from '../models/friend.model';

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

  constructor(private router: Router, private selection: SelectionService) { }

  ngOnInit() {
  }

  studentSelect(formData) {
    console.log("formData", formData.value);
    console.log("this", this);
    this.router.navigate(['availability']);
  }

  studentAdd(formData) {
    const friend: Friend = formData.value;
    console.log("formData", formData.value);
    console.log("this", this);

    this.selection.addFriend(friend).subscribe(data => {
      console.log(data);
    });

    this.router.navigate(['availability']);    
  }
}
