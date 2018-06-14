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
  public categoryDays: CategoryDays[] = [];
  public existingCatDays= [];
  public categories;
  public class;
  public availability;
  public friend = JSON.parse(localStorage.getItem('selectedFriend'));
  public selection = localStorage.getItem('selectionId');
  public currentDay = null;
  public nextDay = null;
  public previousDay = null;
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
        this.existingCatDays = this.selectedCategories.categories;
        this.classService.getClassesById(this.selection).then((data)=> {
          this.class = data;
          this.selectionService.getAvailabilities(this.selection).subscribe((data) => {
            this.availability = data;
            this.formatAvailability();
            if (this.existingCatDays.length > 0 && this.categoryDays.length > 0) {
              this.categoryDays = this.formatCategoryDays(this.categoryDays);
              console.log("this", this);
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
            this.formatAvailability();
            this.currentDay = this.categoryDays[0];
            this.nextDay = this.categoryDays[1];
          });
        });
      }
    });
  }

  ngOnInit() {
  }

  //Filtering Categories from the Class's Availability compared to Students Selected Availability
  formatAvailability() {
    this.availability.map((a)=> {
      this.class.categories.map((c)=> {
        if (c.days.some(d => d.itemName === a.day)) {
          if (!this.dayExists(this.categoryDays, a.day) && !this.categoryExists(c.name)) {
            let catday = this.formatDay(a.day);
            if (c.morning && a.time == "AM") {
              let cat = this.formatCategory(c);
              catday.mornCategories.categories.push(cat);
            }
            else if (c.afternoon && a.time == "PM") {
              let cat = this.formatCategory(c);
              catday.aftCategories.categories.push(cat);
            }
            this.categoryDays.push(catday);
          } else if (this.dayExists(this.categoryDays, a.day) && !this.categoryExists(c.name)) {
            this.categoryDays.map((cd)=> {
              if (cd.day === a.day) {
                let catday = cd;
                if (c.morning && a.time == "AM") {
                  let cat = this.formatCategory(c);
                  catday.mornCategories.categories.push(cat);
                }
                else if (c.afternoon && a.time == "PM") {
                  let cat = this.formatCategory(c);
                  catday.aftCategories.categories.push(cat);
                }
              }
            });
          }
        }
      });
    });
    //This to sort category days by day of the week.
    let categories = this.categoryService.orderDays({categories: this.categoryDays});
    this.categoryDays = categories.categories;
  }

  // Formatting from Students saved selected Categories
  formatCategoryDays(catDays) {
    catDays.map((cd)=>{
      this.existingCatDays.map((ecd)=>{
        if (cd.day == ecd.day) {
          if (cd.mornCategories.categories.length > 0 && ecd.mornCategories.categories.length > 0) {
            for (let i = 0; i < cd.mornCategories.categories.length; i++) {
              for (let j = 0; j < ecd.mornCategories.categories.length; j++) {
                if (cd.mornCategories.categories[i].name == ecd.mornCategories.categories[j].name) {
                  cd.mornCategories.categories[i] = ecd.mornCategories.categories[j];
                }
              }
            }
          }
          if (cd.aftCategories.categories.length > 0 && ecd.aftCategories.categories.length > 0) {
            for (let i = 0; i < cd.aftCategories.categories.length; i++) {
              for (let j = 0; j < ecd.aftCategories.categories.length; j++) {
                if (cd.aftCategories.categories[i].name == ecd.aftCategories.categories[j].name) {
                  cd.aftCategories.categories[i] = ecd.aftCategories.categories[j];
                }
              }
            }
          }
        }
      });
    });

    return catDays;
  }

  selectMornCategory(catIndex: number) {
    this.currentDay.mornCategories.categories[catIndex].selected = !this.currentDay.mornCategories.categories[catIndex].selected;
    let dayIndex = this.categoryDays.map(d=>{return d.day}).indexOf(this.currentDay.day);
    this.categoryDays[dayIndex].mornCategories.categories[catIndex].selected = this.currentDay.mornCategories.categories[catIndex].selected;
  }

  selectAftCategory(catIndex: number) {
    this.currentDay.aftCategories.categories[catIndex].selected = !this.currentDay.aftCategories.categories[catIndex].selected;
    let dayIndex = this.categoryDays.map(d=>{return d.day}).indexOf(this.currentDay.day);
    this.categoryDays[dayIndex].aftCategories.categories[catIndex].selected = this.currentDay.aftCategories.categories[catIndex].selected;
  }

  submitCategories() {
    debugger;
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
    catday.mornCategories = new SelectionCategories();
    catday.mornCategories.categories = [];
    catday.aftCategories = new SelectionCategories();
    catday.aftCategories.categories = [];
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

  private dayExists(days, day) {
    let dayExists = false;
    if (days.length > 0) {
      days.map((c)=> {
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
