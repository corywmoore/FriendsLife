import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import * as _ from "lodash";

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

  private colors = ['green-activity', 'yellow-activity', 'red-activity'];
  private warning = false;

  constructor(private renderer: Renderer, private ref: ElementRef) { }

  ngOnInit() {
  }

  public submitActivities() {

  }

  public resetActivities() {
    this.currentRank = 1;
    this.activitiesSelection = [];
    
    var els = document.getElementsByClassName('activity');
    
    for(var i=els.length-1; i>=0; i--) {
      for(var j=this.colors.length-1; j>=0; j--) {
        els[i].classList.remove(this.colors[j]);
      }
    }
  }

  public activityClicked($event: any, id: number) {
    var index = _.findIndex(this.activitiesSelection, (item: ActivitySelectionModel) => {
      return id === item.id;
    });

    var el = ($event.target.classList.contains('card')) ? $event.target : $event.target.parentElement;

    if (index < 0) {
      var am = new ActivitySelectionModel();

      am.id = id;
      am.rank = this.currentRank;
      this.currentRank++;
      this.activitiesSelection.push(am);
      this.renderer.setElementClass(el, this.colors[am.rank - 1], true);
      this.warning = false;
    } 
  }

  public skillClicked($event: any, skill: string) {
    var els = document.getElementsByClassName('skills');
    
    for(var i=els.length-1; i>=0; i--) {
      for(var j=this.colors.length-1; j>=0; j--) {
        els[i].classList.remove(this.colors[0]);
      }
    }

    var el = ($event.target.classList.contains('card')) ? $event.target : $event.target.parentElement;

    this.currentSkill = skill;
    this.renderer.setElementClass(el, this.colors[0], true);
    
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
  rank: number;
}