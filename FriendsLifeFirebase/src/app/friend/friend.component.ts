import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { SelectionService } from '../services/selection/selection.service';
import { Friend } from '../models/friend.model';

import { FriendService } from '../services/friend/friend.service';
@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  state: string = '';
  error: any;
  friends;
  userName: string;
  friend: string;
  firstName: string;
  lastName: string;
  nickName: string;

  constructor(private router: Router, private selection: SelectionService, private fs : FriendService) { }

  ngOnInit() {
    // let user =JSON.parse(localStorage.getItem('user'));
    // this.userName = user.username;
    // this.adminService.getFriends().subscribe(
    //   data => {
    //     this.friends = data;
    //   });
    this.fs.getFriends((data)=>{
      this.friends = data;
    });
  }

  friendSelect() {
    localStorage.setItem('selectedFriend', JSON.stringify(this.friend));
    this.router.navigate(['availability']);
  }

  friendAdd(formData) {
    const friend: Friend = formData.value;
    console.log("formData", formData.value);
    console.log("this", this);

    this.selection.addFriend(friend).subscribe(data => {
      console.log(data);
    });

    this.router.navigate(['availability']);
  }
}
