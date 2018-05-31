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
  public mornRank = 1;
  public mornSkill: string;
  public aftRank = 1;
  public aftSkill: string;
  public warning = false;
  public selection = localStorage.getItem('selectionId');
  public selectedCategories;
  public currentCategories = new FilteredCategories();
  public showMorning: boolean = false;
  public showAfternoon: boolean = false;

  private catIndex = 0;

  private colors = ['green-activity', 'yellow-activity', 'red-activity'];

  constructor(
    private renderer: Renderer,
    private ref: ElementRef,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.categoryService.getSelectedCategories(this.selection).subscribe((data) => {
      if (data.length > 0) {
        console.log('data', data[0]);
        this.selectedCategories = data[0];
        this.currentCategories = this.filterCategories(0);
        this.mornActivities = this.filterMornActivities(0);
        this.aftActivities = this.filterAftActivities(0);

        this.currentDay = this.selectedCategories.categories[this.catIndex].day;
        this.nextDay = (this.selectedCategories.categories[this.catIndex + 1]) ? this.selectedCategories.categories[1].day : null;

        console.log(this.currentCategories);

        if (this.currentCategories.mornCategories.categories.length > 0) {
          this.showMorning = true;
        } else if (this.currentCategories.aftCategories.categories.length > 0) {
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
    this.mornRank = 1;
    this.aftRank = 1;
    this.warning = false;

    if (this.currentCategories.mornCategories && this.currentCategories.mornCategories.categories.length > 0) {
      this.clearCategoryActivitiesRank(this.currentCategories.mornCategories.categories);
    }

    if (this.currentCategories.aftCategories && this.currentCategories.aftCategories.categories.length > 0) {
      this.clearCategoryActivitiesRank(this.currentCategories.aftCategories.categories);
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
      let cat = (isMorning) ? this.currentCategories.mornCategories.categories[i] : this.currentCategories.aftCategories.categories[i];
      cat.activities[j].rank = (isMorning) ? this.mornRank : this.aftRank;
      if (isMorning) {
        this.mornRank++;
      } else {
        this.aftRank++;
      }
      this.warning = false;
      this.categoryService.updateSelectedCategories(this.selection, this.selectedCategories);
    }
  }

  public skillClicked(skill: string, isMorning: boolean) {
    if (isMorning) {
      this.currentCategories.mornCategories.skillLevel = skill;
    } else {
      this.currentCategories.aftCategories.skillLevel = skill;
    }

    this.categoryService.updateSelectedCategories(this.selection, this.selectedCategories);

    console.log('skill clicked');
  }

  public filterCategories(i: number) {
    let currentCategories = {
      mornCategories: new SelectionCategories(),
      aftCategories: new SelectionCategories()
    };

    currentCategories.aftCategories.categories = this.selectedCategories.categories[i].aftCategories.categories.filter((mc) => { return mc.selected });
    currentCategories.mornCategories.categories = this.selectedCategories.categories[i].mornCategories.categories.filter((mc) => { return mc.selected });

    return currentCategories;
  }

  public filterMornActivities(i: number) {
    return (this.currentCategories.mornCategories.categories && this.currentCategories.mornCategories.categories.length > 0)
      ? this.currentCategories.mornCategories.categories[i].activities
      : null;
  }

  public filterAftActivities(i: number) {
    return (this.currentCategories.aftCategories.categories && this.currentCategories.aftCategories.categories.length > 0)
      ? this.currentCategories.aftCategories.categories[i].activities
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
  mornCategories: SelectionCategories;
  aftCategories: SelectionCategories;
}

export class SelectionCategories {
  skillLevel: string;
  categories: Category[];
}

export class Category {
  id: string;
  name: string;
  imgUrl: string;
  selected: boolean;
  activities = [];
}

