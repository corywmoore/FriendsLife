import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  selectedUser : User = new User();
  users = [];
  constructor() { }

  ngOnInit() {
    this.users=[{id: 1,
      username: 'fasfsd',
      password: 'fsdfdsdf'}];
  }

  userAdd(dataForm) {
    dataForm.value.id = new Date().getTime() * -1;
    this.users.push(dataForm.value);
    this.resetForm();
  }

  onUserClick(user) {
    this.selectedUser = user;
  }

  userEdit(addUserForm) {
    this.users.map((u) => {
      if (u.id === addUserForm.value.id) u = addUserForm.value;
    });

    this.resetForm();
  }

  userDelete(addUserForm) {
    let tempArray = [];
    this.users.map((u) => {
      if (u.id != addUserForm.value.id) tempArray.push(u);
    });
    this.users = tempArray;
    this.resetForm();
  }

  resetForm() {
    this.selectedUser = new User();
  }

}
