import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categoryDays: CategoryDays[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.categoryDays = [];

    let catday = new CategoryDays();
    catday.day = "Monday";
    catday.categories = [];

    let cat = new Category();
    cat.title = "Cooking";
    cat.selected = false;
    cat.imgUrl = "../../assets/cooking-foodprep.png";
    catday.categories.push(cat);
    cat = new Category();

    cat.title = "Visual Arts";
    cat.selected = false;
    cat.imgUrl = "../../assets/cooking-kitchentools.png";
    catday.categories.push(cat);
    cat = new Category();

    cat.title = "Performing Arts";
    cat.selected = false;
    cat.imgUrl = "../../assets/cooking-shopping.png";
    catday.categories.push(cat);
    this.categoryDays.push(catday);


    catday = new CategoryDays();
    catday.day = "Wednesday";
    catday.categories = [];

    cat = new Category();
    cat.title = "Cooking";
    cat.selected = false;
    cat.imgUrl = "../../assets/cooking-foodprep.png";
    catday.categories.push(cat);

    cat = new Category();
    cat.title = "Visual Arts";
    cat.selected = false;
    cat.imgUrl = "../../assets/cooking-kitchentools.png";
    catday.categories.push(cat);

    cat = new Category();
    cat.title = "Performing Arts";
    cat.selected = false;
    cat.imgUrl = "../../assets/cooking-shopping.png";
    catday.categories.push(cat);
    this.categoryDays.push(catday);


    catday = new CategoryDays();
    catday.day = "Friday";
    catday.categories = [];

    cat = new Category();
    cat.title = "Cooking";
    cat.selected = false;
    cat.imgUrl = "../../assets/cooking-foodprep.png";
    catday.categories.push(cat);

    cat = new Category();
    cat.title = "Visual Arts";
    cat.selected = false;
    cat.imgUrl = "../../assets/cooking-kitchentools.png";
    catday.categories.push(cat);

    cat = new Category();
    cat.title = "Performing Arts";
    cat.selected = false;
    cat.imgUrl = "../../assets/cooking-shopping.png";
    catday.categories.push(cat);
    this.categoryDays.push(catday);

    console.log(this.categoryDays);
  }

  selectCategory(dayIndex: number, catIndex: number) {
    console.log(dayIndex + ' ' + catIndex);
    this.categoryDays[dayIndex].categories[catIndex].selected = !this.categoryDays[dayIndex].categories[catIndex].selected;
    console.log(this.categoryDays[dayIndex].categories[catIndex].selected);
  }

  submitCategories() {
    this.router.navigate(['activities']);
  }
}

export class CategoryDays {
  day: string;
  categories: Category[];
}

export class Category {
  title: string;
  imgUrl: string;
  selected: boolean;
}