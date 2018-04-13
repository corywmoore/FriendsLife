import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { SelectionService } from '../services/selection/selection.service';
import { Friend } from '../models/friend.model';

import { AdminService } from '../services/admin/admin.service';
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
  firstname: string;
  lastname: string;
  nickname: string;

  constructor(private router: Router, private selection: SelectionService, private adminService : AdminService) { }

  ngOnInit() {
    this.friends = this.adminService.getFriends();
  }

  friendSelect(formData) {
    localStorage.setItem('selectedFriend', JSON.stringify(formData.value));
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
