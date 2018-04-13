import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public addCategoryView = false;

  constructor() { }

  ngOnInit() {
  }

  public addCategory() {
    this.addCategoryView = true;
    console.log('add Cat');
  }

  public cancelAddCategory() {
    console.log('cancel cat');
    
    this.addCategoryView = false;

  }

  public submitAddCategory() {
    console.log('submit cat');
    
    this.addCategoryView = false;
  }
}
