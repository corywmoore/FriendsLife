import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { SelectionService } from '../services/selection/selection.service';
import { Friend } from '../models/friend.model';
import { NgForm } from '@angular/forms';

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
    this.fs.getFriends((data)=>{
      this.friends = data;
    });
  }

  friendSelect() {
    localStorage.setItem('selectedFriend', JSON.stringify(this.friend));
    this.router.navigate(['availability']);
  }

  friendAdd(friend) {
    this.fs.addFriend(friend.value);
    this.resetForm(friend);
  }

  resetForm(form? : NgForm) {
    if (form != null) {
      form.reset();
    }

    this.firstName = '';
    this.lastName = '';
    this.nickName = '';
  }

}
