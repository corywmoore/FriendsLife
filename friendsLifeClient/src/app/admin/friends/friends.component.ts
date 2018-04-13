import { Component, OnInit } from '@angular/core';
import { Friend } from '../../models/friend.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  selectedFriend : Friend = new Friend();
  friends = [];
  constructor() { }

  ngOnInit() {
    this.friends=[{id: 1,
      firstname: 'fasfsd',
      lastname: 'fsdfdsdf',
      nickname: 'fsafsdfs'}];
  }

  onFriendClick(friend) {
    this.selectedFriend = friend;
  }

  friendEdit(editFriendForm) {
    this.friends.map((f) => {
      if (f.id === editFriendForm.value.id) f = editFriendForm.value;
    });

    this.resetForm();
  }

  friendDelete(editFriendForm) {
    let tempArray = [];
    this.friends.map((f) => {
      if (f.id != editFriendForm.value.id) tempArray.push(f);
    });
    this.friends = tempArray;
    this.resetForm();
  }

  resetForm() {
    this.selectedFriend = new Friend();
  }
}
