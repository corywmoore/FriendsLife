import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class AdminActivitiesComponent implements OnInit {

  public selectedFriend;
  public addCategoryView;

  constructor() { }

  ngOnInit() {

  }

  addCategory(){}

}
