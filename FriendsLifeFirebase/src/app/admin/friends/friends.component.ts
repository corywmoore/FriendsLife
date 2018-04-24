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

  public onFriendClick(friend) {
    this.selectedFriend = Object.assign({},friend);
  }

  public friendEdit(friend) {
    this.fs.updateFriend(friend.value);
    this.resetForm(friend);
  }

  public friendDelete(friend) {
    this.fs.deleteFriend(friend.id);
  }

  public friendAdd(friend) {
    this.fs.addFriend(friend.value);
    this.resetForm(friend);
  }

  private resetForm(form? : NgForm) {
    if (form != null) {
      form.reset();
    }
    this.selectedFriend = Object.assign({},new Friend());
  }
}
