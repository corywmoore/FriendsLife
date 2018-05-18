import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionService } from '../services/selection/selection.service';
import { Friend } from '../models/friend.model';
import { NgForm } from '@angular/forms';

import { FriendService } from '../services/friend/friend.service';
import { ClassService } from '../services/class/class.service';
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
  friend;
  firstName: string;
  lastName: string;
  nickName: string;
  classes;
  class;
  constructor(
    private router: Router,
    private fs: FriendService,
    private cs: ClassService,
    private ss: SelectionService
  ) { }

  ngOnInit() {
    this.fs.getFriends((data) => {
      this.friends = data;
    });
    this.cs.getClasses((data) => {
      this.classes = data;
    });
  }

  friendSelect() {
    localStorage.setItem('selectedFriend', JSON.stringify(this.friend));
    localStorage.setItem('selectedClass', JSON.stringify(this.class));

    console.log('friend', this.friend);
    console.log('classes', this.class);

    this.ss.getSelectionByFriend(this.friend.id, this.class.id)
      .then((isSelection: boolean) => {
        if (isSelection) {
          this.router.navigate(['availability']);
        } else {
          this.ss.createSelection(this.class.id, this.friend)
            .then((selectionId: string) => {
              this.router.navigate(['availability']);
            });
        }
      });
  }

  friendAdd(friend) {
    this.fs.addFriend(friend.value);
    this.resetForm(friend);
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }

    this.firstName = '';
    this.lastName = '';
    this.nickName = '';
  }

}
