import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from '../services/class/class.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categoryDays: CategoryDays[];
  public categories;
  public class = JSON.parse(localStorage.getItem('selectedClass'));
  public availability = JSON.parse(localStorage.getItem('selectedAvailability'));
  public currentDay = null;
  public nextDay = null;
  public previousDay = null;

  constructor(
    private router: Router,
    private classService: ClassService
  ) {
    this.classService.getCategories((data) => {
      this.categories = data;
     });
  }

  ngOnInit() {
    this.categoryDays = [];
    this.availability.map((a)=> {
      this.class.categories.map((c)=> {
        if (c.days.some(d => d.itemName === a.day)) {
          if (!this.dayExists(a.day) && !this.categoryExists(c.name)) {
            let catday = this.formatDay(a.day);
            if ((c.morning && c.afternoon) && (a.morning && a.afternoon)) {
              let cat = this.formatCategory(c);
              catday.mornCategories.push(Object.assign({}, cat));
              catday.aftCategories.push(Object.assign({}, cat));
            }
            else if (c.morning && a.morning) {
              let cat = this.formatCategory(c);
              catday.mornCategories.push(Object.assign({}, cat));
            }
            else if (c.afternoon && a.afternoon) {
              let cat = this.formatCategory(c);
              catday.aftCategories.push(Object.assign({}, cat));
            }
            this.categoryDays.push(catday);
          } else if (this.dayExists(a.day) && !this.categoryExists(c.name)) {
            this.categoryDays.map((cd)=> {
              if (cd.day === a.day) {
                let catday = cd;
                if ((c.morning && c.afternoon) && (a.morning && a.afternoon)) {
                  let cat = this.formatCategory(c);
                  catday.mornCategories.push(Object.assign({}, cat));
                  catday.aftCategories.push(Object.assign({}, cat));
                }
                 else if (c.morning && a.morning) {
                  let cat = this.formatCategory(c);
                  catday.mornCategories.push(Object.assign({}, cat));
                }
                else if (c.afternoon && a.afternoon) {
                  let cat = this.formatCategory(c);
                  catday.aftCategories.push(Object.assign({}, cat));
                }
              }
            });
          }
        }
      });
    });

    this.currentDay = this.categoryDays[0];
    this.nextDay = this.categoryDays[1];
  }

  selectMornCategory(catIndex: number) {
    this.currentDay.mornCategories[catIndex].selected = !this.currentDay.mornCategories[catIndex].selected;
    let dayIndex = this.categoryDays.map(d=>{return d.day}).indexOf(this.currentDay.day);
    this.categoryDays[dayIndex].mornCategories[catIndex].selected = this.currentDay.mornCategories[catIndex].selected;
  }

  selectAftCategory(catIndex: number) {
    this.currentDay.aftCategories[catIndex].selected = !this.currentDay.aftCategories[catIndex].selected;
    let dayIndex = this.categoryDays.map(d=>{return d.day}).indexOf(this.currentDay.day);
    this.categoryDays[dayIndex].aftCategories[catIndex].selected = this.currentDay.aftCategories[catIndex].selected;
  }

  submitCategories() {
    this.router.navigate(['activities']);
  }

  public setNextDay() {
    let dayIndex = this.categoryDays.map(d=>{return d.day}).indexOf(this.currentDay.day);
    this.previousDay = this.categoryDays[dayIndex];
    this.currentDay = this.categoryDays[dayIndex + 1];
    this.nextDay = this.categoryDays[dayIndex + 2];
  }

  public setPreviousDay() {
    let dayIndex = this.categoryDays.map(d=>{return d.day}).indexOf(this.currentDay.day);
    this.previousDay = this.categoryDays[dayIndex - 2];
    this.currentDay = this.categoryDays[dayIndex - 1];
    this.nextDay = this.categoryDays[dayIndex];
  }

  private formatDay(day) {
    let catday = new CategoryDays();
    catday.day = day;
    catday.mornCategories = [];
    catday.aftCategories = [];
    return catday;
  }

  private formatCategory(cat) {
    let category = new Category();
    category.id = cat.id;
    category.name =  cat.name;
    category.imgUrl =  cat.imageUrl;
    category.selected =false;
    category.activities = cat.activities;

    return category;
  }

  private dayExists(day) {
    let dayExists = false;
    if (this.categoryDays.length > 0) {
      this.categoryDays.map((c)=> {
        if (c.day === day) {
          dayExists = true;
        }
      });
    }

    return dayExists;
  }

  private categoryExists(name) {
    let categoryExists = false;
    if (this.categoryDays.length > 0) {
      this.categoryDays.map((c)=> {
        if (c.day === name) {
          categoryExists = true;
        }
      });
    }

    return categoryExists;
  }
}

export class CategoryDays {
  day: string;
  mornCategories: Category[];
  aftCategories: Category[];
}

export class Category {
  id: string;
  name: string;
  imgUrl: string;
  selected: boolean;
  activities = [];
}
