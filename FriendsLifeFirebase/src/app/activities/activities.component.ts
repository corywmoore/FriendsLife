import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import * as _ from "lodash";
import { Router } from '@angular/router';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  public activitiesSelection: ActivitySelectionModel[] = [];
  public mornActivities: ActivityModel[] = [];
  public aftActivities: ActivityModel[] = [];
  public currentDay = null;
  public nextDay = null;
  public currentRank = 1;
  public currentSkill: string;
  public warning = false;
  public selectedFriend;
  public activity: ActivityModel[] = [];
  public selection = localStorage.getItem('selectionId');
  public selectedCategories;
  public currentCategories = new FilteredCategories();
  public showMorning:boolean = false;
  public showAfternoon:boolean = false;

  private colors = ['green-activity', 'yellow-activity', 'red-activity'];

  constructor(
    private renderer: Renderer,
    private ref: ElementRef,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.categoryService.getSelectedCategories(this.selection).subscribe((data)=> {
      if (data.length > 0) {
        this.selectedCategories = data[0];
        this.currentDay = this.selectedCategories.categories[0].day;
        this.nextDay = this.selectedCategories.categories[1].day;
        this.currentCategories = this.filterCategories(0);
        this.mornActivities = this.filterMornActivities(0);
        this.aftActivities = this.filterAftActivities(0);
        if (this.currentCategories.mornCategories.length > 0) {
          this.showMorning = true;
        } else if (this.currentCategories.aftCategories.length > 0) {
          this.showAfternoon = true;
        }
        console.log("this", this);
        // this.categoryDays = this.selectedCategories.categories;
        // this.currentDay = this.categoryDays[0];
        // this.nextDay = this.categoryDays[1];
      }
    });
  }

  ngOnInit() {
    let friend = JSON.parse(localStorage.getItem('selectedFriend'));
    this.selectedFriend = friend;
    const imgArr = ['../../assets/cooking-foodprep.png', '../../assets/cooking-kitchentools.png', '../../assets/cooking-shopping.png'];
    let act;
    for (let i = 1; i <= 3; i++) {
      act = new ActivityModel();
      act.name = 'Place Holder';
      act.rank = 0;
      act.imgUrl = imgArr[i - 1];
      this.activity.push(act);
    }
  }

  public submitActivities() {

    this.router.navigate(['selections']);

  }

  public resetActivities() {
    this.currentRank = 1;
    this.activitiesSelection = [];

    const els = document.getElementsByClassName('activity');

    for (let i = els.length - 1; i >= 0; i--) {
      for (let j = this.colors.length - 1; j >= 0; j--) {
        els[i].classList.remove(this.colors[j]);
      }
    }

    this.warning = false;
  }

  public mornActivityClicked(act: any, i: number, j:number) {
    //currentCategories.mornCategories
    console.log("this", this);
    console.log("act", act);
    console.log("i", i);
    console.log("j", j);
    this.currentCategories.mornCategories[i].activities[j].rank = this.currentRank;
    this.currentRank++;
    this.warning = false;
  }

  public skillClicked($event: any, skill: string) {
    let els = document.getElementsByClassName('skills');

    for (let i = els.length - 1; i >= 0; i--) {
      for (let j = this.colors.length - 1; j >= 0; j--) {
        els[i].classList.remove(this.colors[0]);
      }
    }

    let el = ($event.target.classList.contains('card')) ? $event.target : $event.target.parentElement;

    this.currentSkill = skill;
    this.renderer.setElementClass(el, this.colors[0], true);

    this.warning = false;
  }

  public filterCategories(i:number) {
    let currentCategories = {
      mornCategories: this.selectedCategories.categories[i].mornCategories.filter((mc) => {return mc.selected}),
      aftCategories: this.selectedCategories.categories[i].aftCategories.filter((mc) => {return mc.selected}),
    };

    return currentCategories;
  }

  public filterMornActivities(i:number) {
   return this.currentCategories.mornCategories[i].activities;
  }

  public filterAftActivities(i:number) {
    return this.currentCategories.aftCategories[i].activities;
  }
}

export class ActivityModel {
  id: number;
  name: string;
  imgUrl: string;
  rank: number;
}


export class ActivitySelectionModel {
  id: number;
  crank: number;
}

export class FilteredCategories {
  mornCategories= [];
  aftCategories = [];
}
