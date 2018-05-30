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
  public mornActivities: ActivityModel[] = [];
  public aftActivities: ActivityModel[] = [];
  public currentDay = null;
  public nextDay = null;
  public currentRank = 1;
  public currentSkill: string;
  public warning = false;
  public selection = localStorage.getItem('selectionId');
  public selectedCategories;
  public currentCategories = new FilteredCategories();
  public showMorning: boolean = false;
  public showAfternoon: boolean = false;
  public selectedData: any;

  private colors = ['green-activity', 'yellow-activity', 'red-activity'];

  constructor(
    private renderer: Renderer,
    private ref: ElementRef,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.categoryService.getSelectedCategories(this.selection).subscribe((data) => {
      console.log('data', data);
      this.selectedData = data[0];

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
      }
    });
  }

  ngOnInit() { }

  public submitActivities() {

    this.router.navigate(['selections']);

  }

  public resetActivities() {
    this.currentRank = 1;
    this.warning = false;

    if (this.currentCategories.mornCategories && this.currentCategories.mornCategories.length > 0) {
      this.clearCategoryActivitiesRank(this.currentCategories.mornCategories);
    }

    if (this.currentCategories.aftCategories && this.currentCategories.aftCategories.length > 0) {
      this.clearCategoryActivitiesRank(this.currentCategories.aftCategories);
    }
  }

  private clearCategoryActivitiesRank(cat) {
    for (let i = cat.length - 1; i >= 0; i--) {
      for (let j = cat[i].activities.length - 1; j >= 0; j--) {
        cat[i].activities[j].rank = -1;
      }
    }

    this.categoryService.updateSelectedCategories(this.selection, this.selectedCategories);
  }

  public activityClicked(act: any, i: number, j: number, isMorning: boolean) {
    console.log('clicked', act);
    if (act && (!act.rank || (act.rank && act.rank < 1))) {
      let cat = (isMorning) ? this.currentCategories.mornCategories[i] : this.currentCategories.aftCategories[i];
      cat.activities[j].rank = this.currentRank;
      this.currentRank++;
      this.warning = false;
      this.categoryService.updateSelectedCategories(this.selection, this.selectedCategories);
    }
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

  public filterCategories(i: number) {
    let currentCategories = {
      mornCategories: this.selectedCategories.categories[i].mornCategories.filter((mc) => { return mc.selected }),
      aftCategories: this.selectedCategories.categories[i].aftCategories.filter((mc) => { return mc.selected }),
    };

    return currentCategories;
  }

  public filterMornActivities(i: number) {
    return (this.currentCategories.mornCategories && this.currentCategories.mornCategories.length > 0)
      ? this.currentCategories.mornCategories[i].activities
      : null;
  }

  public filterAftActivities(i: number) {
    return (this.currentCategories.aftCategories && this.currentCategories.aftCategories.length > 0)
      ? this.currentCategories.aftCategories[i].activities
      : null;
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
  mornCategories = [];
  aftCategories = [];
}
