import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.scss']
})
export class SelectionsComponent implements OnInit {

  public selectedFriend;

  constructor() { }

  ngOnInit() {
    let friend =JSON.parse(localStorage.getItem('selectedFriend'));
    this.selectedFriend = friend;
  }

}
