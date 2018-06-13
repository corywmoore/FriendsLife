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
  public currentDay: string = null;
  public nextDay = false;
  public warning = false;
  public selection = localStorage.getItem('selectionId');
  public selectedCategories;

  private catIndex = 0;
  private colors = ['green-activity', 'yellow-activity', 'red-activity'];

  constructor(
    private renderer: Renderer,
    private ref: ElementRef,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.categoryService.getSelectedCategories(this.selection).subscribe((data) => {
      this.selectedCategories = this.orderDays(JSON.parse(JSON.stringify(data[0])));
      this.currentDay = this.selectedCategories.categories[this.catIndex].day;
      this.checkThings();
    });
  }

  ngOnInit() { }

  public submitActivities() {
    this.router.navigate(['selections']);
  }

  public nextActivity() {
    this.catIndex++;
    this.currentDay = this.selectedCategories.categories[this.catIndex].day;
  }

  public resetActivities() {
    this.warning = false;

    if (this.selectedCategories.categories[this.catIndex].mornCategories && this.selectedCategories.categories[this.catIndex].mornCategories.categories.length > 0) {
      this.clearCategoryActivitiesRank(this.selectedCategories.categories[this.catIndex].mornCategories.categories);
    }

    if (this.selectedCategories.categories[this.catIndex].aftCategories && this.selectedCategories.categories[this.catIndex].aftCategories.categories.length > 0) {
      this.clearCategoryActivitiesRank(this.selectedCategories.categories[this.catIndex].aftCategories.categories);
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

  public activityClicked(cat: any, act: any) {
    console.log('activity clicked', cat);
    const rank = this.getRank(cat);

    console.log('rank', rank);

    if (rank < 4) {
      act.rank = rank;
      console.log(this.selectedCategories);
      this.categoryService.updateSelectedCategories(this.selection, this.selectedCategories);
    }

    this.warning = false;
  }

  public skillClicked(skill: string, isMorning: boolean, aft: any) {
    let cat = this.selectedCategories.categories[this.catIndex];
    aft.skillLevel = skill;
    this.categoryService.updateSelectedCategories(this.selection, this.selectedCategories);
  }

  private checkThings() {
    this.nextDay = (this.selectedCategories.categories.length > this.catIndex + 1);
  }

  private getRank(cat: any) {
    let rank = 1;

    for (let act of cat.activities) {
      if (act.rank && act.rank >= rank) {
        if (act.rank === 3) {
          return 4;
        } else {
          rank = act.rank;
          rank++;
        }
      }
    }

    return rank;
  }

  private orderDays(data) {
    data.categories.sort((a, b) => {
      return this.sorter[a.day.toLowerCase()] - this.sorter[b.day.toLowerCase()];
    });

    return data;
  }

  private sorter = {
    "sunday": 0,
    "monday": 1,
    "tuesday": 2,
    "wednesday": 3,
    "thursday": 4,
    "friday": 5,
    "saturday": 6
  }
}


