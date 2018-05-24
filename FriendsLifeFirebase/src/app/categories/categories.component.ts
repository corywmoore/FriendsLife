import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from '../services/class/class.service';
import { SelectionService } from '../services/selection/selection.service';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categoryDays: CategoryDays[];
  public existingCatDays= [];
  public categories;
  public class;
  public availability;
  public friend = JSON.parse(localStorage.getItem('selectedFriend'));
  public selection = localStorage.getItem('selectionId');
  public currentDay = null;
  public nextDay = null;
  public previousDay = null;
  public saveCategories = false;
  public selectedCategories = null;

  constructor(
    private router: Router,
    private classService: ClassService,
    private selectionService: SelectionService,
    private categoryService: CategoryService
  ) {
    if (this.selection == "undefined") {
      this.router.navigate(['friend']);
    }
    this.classService.getCategories((data) => {
      this.categories = data;
     });

    this.categoryService.getSelectedCategories(this.selection).subscribe((data)=> {
      if (data.length > 0) {
        this.selectedCategories = data[0];
        this.categoryDays = this.selectedCategories.categories;
        this.classService.getClassesById(this.selection).then((data)=> {
          this.class = data;
          this.selectionService.getAvailabilities(this.selection).subscribe((data) => {
            this.availability = data;
            this.formatExisitingAvailibilty();
            this.formatAvailibilty();
            if (this.existingCatDays.length > 0 && this.categoryDays.length > 0) {
              this.categoryDays = this.formatCategoryDays(this.categoryDays);
              this.currentDay = this.categoryDays[0];
              this.nextDay = this.categoryDays[1];
            } else {
              debugger;
              this.currentDay = this.categoryDays[0];
              this.nextDay = this.categoryDays[1];
            }
          });
        });
      } else {
        this.classService.getClassesById(this.selection).then((data)=> {
          this.class = data;
          this.selectionService.getAvailabilities(this.selection).subscribe((data) => {
            this.availability = data;
            this.formatAvailibilty();
            this.currentDay = this.categoryDays[0];
            this.nextDay = this.categoryDays[1];
          });
        });
      }
    });
  }

  ngOnInit() {
  }

  formatAvailibilty() {
    this.categoryDays = [];
    this.availability.map((a)=> {
      this.class.categories.map((c)=> {
        if (c.days.some(d => d.itemName === a.day)) {
          if (!this.dayExists(a.day) && !this.categoryExists(c.name)) {
            let catday = this.formatDay(a.day);
            if (c.morning && a.time == "AM") {
              let cat = this.formatCategory(c);
              catday.mornCategories.push(cat);
            }
            else if (c.afternoon && a.time == "PM") {
              let cat = this.formatCategory(c);
              catday.aftCategories.push(cat);
            }
            this.categoryDays.push(catday);
          } else if (this.dayExists(a.day) && !this.categoryExists(c.name)) {
            this.categoryDays.map((cd)=> {
              if (cd.day === a.day) {
                let catday = cd;
                if (c.morning && a.time == "AM") {
                  let cat = this.formatCategory(c);
                  catday.mornCategories.push(cat);
                }
                else if (c.afternoon && a.time == "PM") {
                  let cat = this.formatCategory(c);
                  catday.aftCategories.push(cat);
                }
              }
            });
          }
        }
      });
    });


  }

  formatExisitingAvailibilty() {
    this.availability.map((a)=> {
      this.categoryDays.map((c)=> {
        if (c.day == a.day) {
          if (this.existingCatDays.length > 0) {
            this.existingCatDays.map((cd)=> {
              if (cd.day === a.day) {
                let catday = cd;
                if (c.mornCategories.length > 0 && a.time == "AM") {
                  catday.mornCategories = c.mornCategories;
                }
                else if (c.aftCategories.length > 0 && a.time == "PM") {
                  catday.aftCategories = c.aftCategories;
                }
              }
            });
          } else {
            let catday = this.formatDay(a.day);
            if (c.mornCategories.length > 0 && a.time == "AM") {
              catday.mornCategories = c.mornCategories;
            }
            else if (c.aftCategories.length > 0 && a.time == "PM") {
              catday.aftCategories = c.aftCategories;
            }
            this.existingCatDays.push(catday);
          }
        }
      });
    });
  }

  formatCategoryDays(catDays) {
    catDays.map((cd)=>{
      this.existingCatDays.map((ecd)=>{
        if (cd.day == ecd.day) {
          if (cd.mornCategories.length > 0 && ecd.mornCategories.length > 0) {
            for (let i = 0; i < cd.mornCategories.length; i++) {
              for (let j = 0; j < ecd.mornCategories.length; j++) {
                if (cd.mornCategories[i].name == ecd.mornCategories[j].name) {
                  cd.mornCategories[i] = ecd.mornCategories[j];
                }
              }
            }
          }
          if (cd.aftCategories.length > 0 && ecd.aftCategories.length > 0) {
            for (let i = 0; i < cd.aftCategories.length; i++) {
              for (let j = 0; j < ecd.aftCategories.length; j++) {
                if (cd.aftCategories[i].name == ecd.aftCategories[j].name) {
                  cd.aftCategories[i] = ecd.aftCategories[j];
                }
              }
            }
          }
        }
      });
    });

    // console.log("catDays", catDays);
    return catDays;
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
    console.log("this", this);debugger;
    if (this.selectedCategories == null) {
      this.categoryService.addSelectedCategories(this.selection, {categories: this.categoryDays})
        .then((id) => {
          localStorage.setItem('selectedCategories', JSON.stringify(id));
          this.router.navigate(['activities']);
        });
    } else {
      this.selectedCategories.categories = this.categoryDays;
      this.categoryService.updateSelectedCategories(this.selection, this.selectedCategories);
      localStorage.setItem('selectedCategories', JSON.stringify(this.selectedCategories.id));
      this.router.navigate(['activities']);
    }

  }

  public setNextDay() {
    let dayIndex = this.categoryDays.map(d=>{return d.day}).indexOf(this.currentDay.day);
    this.previousDay = this.categoryDays[dayIndex];
    this.currentDay = this.categoryDays[dayIndex + 1];
    this.nextDay = this.categoryDays[dayIndex + 2];
    this.saveCategories = this.nextDay === undefined;
  }

  public setPreviousDay() {
    let dayIndex = this.categoryDays.map(d=>{return d.day}).indexOf(this.currentDay.day);
    this.previousDay = this.categoryDays[dayIndex - 2];
    this.currentDay = this.categoryDays[dayIndex - 1];
    this.nextDay = this.categoryDays[dayIndex];
    this.saveCategories = this.nextDay === undefined;
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
    category.selected = false;
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
