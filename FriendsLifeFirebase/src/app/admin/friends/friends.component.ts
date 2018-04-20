import { Component, OnInit } from '@angular/core';
import { Friend } from '../../models/friend.model';
import { FriendService } from '../../services/friend/friend.service';

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
    this.selectedFriend = friend;
  }

  friendEdit(friend) {
    console.log("friend", friend);
    this.selectedFriend = friend;
    // this.friends.map((f) => {
    //   if (f.id === editFriendForm.value.id) f = editFriendForm.value;
    // });
    //
    // this.resetForm();
  }

  friendDelete(friend) {
    this.fs.deleteFriend(friend.id);
  }

  resetForm() {
    this.selectedFriend = new Friend();
  }

  friendAdd(formData) {
    console.log("formData", formData.value);
    this.fs.addFriend(formData.value);
    // const friend: Friend = formData.value;
    //
    // console.log("this", this);
    //
    // this.selection.addFriend(friend).subscribe(data => {
    //   console.log(data);
    // });
    //
    // this.router.navigate(['availability']);
  }
}
