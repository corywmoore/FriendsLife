import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import * as _ from "lodash";
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  public activitiesSelection: ActivitySelectionModel[] = [];
  public activities: ActivityModel[] = [];
  public currentRank = 1;
  public currentSkill: string;
  public warning = false;
  public activity: ActivityModel[] = [];

  private colors = ['green-activity', 'yellow-activity', 'red-activity'];

  constructor(private renderer: Renderer, private ref: ElementRef, private router: Router) { }

  ngOnInit() {
    const imgArr = ['../../assets/cooking-foodprep.png', '../../assets/cooking-kitchentools.png', '../../assets/cooking-shopping.png'];
    let act;
    for (let i = 1; i <= 3; i++) {
      act = new ActivityModel();
      act.name = 'Place Holder';
      act.rank = 0;
      act.imgUrl = imgArr[i - 1];
      this.activity.push(act);
    }
    console.log(this.activity);
  }

  public submitActivities() {
    if(this.activitiesSelection.length < 3 || !this.currentSkill) {
      this.warning = true;
    } else {
      this.router.navigate(['selections']);
    }
  }

  public resetActivities() {
    this.currentRank = 1;
    this.activitiesSelection = [];

    const  els = document.getElementsByClassName('activity');

    for(let i=els.length-1; i>=0; i--) {
      for(let j=this.colors.length-1; j>=0; j--) {
        els[i].classList.remove(this.colors[j]);
      }
    }

    this.warning = false;
  }

  public activityClicked($event: any, id: number) {
    console.log(id)
      this.activity[id].rank = this.currentRank;
    this.currentRank++;
      this.warning = false;
  }

  public skillClicked($event: any, skill: string) {
    let els = document.getElementsByClassName('skills');

    for(let i=els.length-1; i>=0; i--) {
      for(let j=this.colors.length-1; j>=0; j--) {
        els[i].classList.remove(this.colors[0]);
      }
    }

    let el = ($event.target.classList.contains('card')) ? $event.target : $event.target.parentElement;

    this.currentSkill = skill;
    this.renderer.setElementClass(el, this.colors[0], true);

    this.warning = false;
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
