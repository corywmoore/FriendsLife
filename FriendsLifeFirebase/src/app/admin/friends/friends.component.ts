import { Component, OnInit } from '@angular/core';
import { Friend } from '../../models/friend.model';
import { FriendService } from '../../services/friend/friend.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  selectedFriend : Friend = new Friend();
  public friends;
  constructor(private fs : FriendService) { }

  ngOnInit() {
    this.fs.getFriends((data)=>{
      this.friends = data;
    });
  }

  onFriendClick(friend) {
    this.selectedFriend = Object.assign({},friend);
  }

  friendEdit(friend) {
    this.fs.updateFriend(friend.value);
    this.resetForm(friend);
  }

  friendDelete(friend) {
    this.fs.deleteFriend(friend.id);
  }

  friendAdd(friend) {
    this.fs.addFriend(friend.value);
    this.resetForm(friend);
  }

  resetForm(form? : NgForm) {
    if (form != null) {
      form.reset();
    }
    this.selectedFriend = Object.assign({},new Friend());
  }
}
