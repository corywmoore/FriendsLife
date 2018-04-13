import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
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

  constructor(private router: Router, private adminService : AdminService) { }

  ngOnInit() {
    this.friends = this.adminService.getFriends();
  }

  friendSelect(formData) {
    localStorage.setItem('selectedFriend', JSON.stringify(formData.value));
    this.router.navigate(['availability']);
  }

  friendAdd(formData) {
    //wire api
    this.friends.push(formData.value);
    this.router.navigate(['availability']);
  }
}
