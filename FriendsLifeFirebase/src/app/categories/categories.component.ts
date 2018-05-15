import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categoryDays: CategoryDays[];
  public class = JSON.parse(localStorage.getItem('selectedClass'));
  public availability = JSON.parse(localStorage.getItem('selectedAvailability'));
  public currentDay = null;
  public nextDay = null;
  public previousDay = null;
  constructor(private router: Router) { }

  ngOnInit() {
    this.categoryDays = [];
    this.availability.map((a)=> {
      this.class.categories.map((c)=> {
        if (c.days.some(d => d.itemName === a.day)) {
          if (!this.dayExists(a.day) && !this.categoryExists(c.name)) {
            let catday = this.formatDay(a.day);
            if ((c.morning && c.afternoon) && (a.morning && a.afternoon)) {
              let cat = this.formatCategory(c);
              catday.mornCategories.push(cat);
              catday.aftCategories.push(cat);
            }
            else if (c.morning && a.morning) {
              let cat = this.formatCategory(c);
              catday.mornCategories.push(cat);
            }
            else if (c.afternoon && a.afternoon) {
              let cat = this.formatCategory(c);
              catday.aftCategories.push(cat);
            }
            this.categoryDays.push(catday);
          } else if (this.dayExists(a.day) && !this.categoryExists(c.name)) {
            this.categoryDays.map((cd)=> {
              if (cd.day === a.day) {
                let catday = cd;
                if ((c.morning && c.afternoon) && (a.morning && a.afternoon)) {
                  let cat = this.formatCategory(c);
                  catday.mornCategories.push(cat);
                  catday.aftCategories.push(cat);
                }
                 else if (c.morning && a.morning) {
                  let cat = this.formatCategory(c);
                  catday.mornCategories.push(cat);
                }
                else if (c.afternoon && a.afternoon) {
                  let cat = this.formatCategory(c);
                  catday.aftCategories.push(cat);
                }
              }
            });
          }
        }
      });
    });
      console.log("this.categoryDays", this.categoryDays);
    this.currentDay = this.categoryDays[0];
    this.nextDay = this.categoryDays[1];
    this.setNextDay();
  }

  selectCategory(dayIndex: number, catIndex: number) {
    console.log(dayIndex + ' ' + catIndex);
    this.categoryDays[dayIndex].categories[catIndex].selected = !this.categoryDays[dayIndex].categories[catIndex].selected;
    console.log(this.categoryDays[dayIndex].categories[catIndex].selected);
  }

  submitCategories() {
    this.router.navigate(['activities']);
  }

  public setNextDay() {

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
        if (c.name === name) {
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
