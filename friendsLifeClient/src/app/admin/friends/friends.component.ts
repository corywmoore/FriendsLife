import { Component, OnInit } from '@angular/core';
import { Friend } from '../../models/friend.model';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  selectedFriend : Friend = new Friend();
  public friends;
  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.adminService.getFriends().subscribe(
      data => {
        this.friends = data;
      });
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
