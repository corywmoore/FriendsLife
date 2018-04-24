import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
// import { AdminService } from '../../services/admin/admin.service';
// import {Observable} from 'rxjs/Observble';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categories;
  selectedCategory : Category = new Category();
  public addCategoryView: boolean = false;

  constructor() { }

  ngOnInit() {
    // this.addCategoryView = false;
    // this.adminService.getCategories().subscribe(
    //   data => {
    //     this.categories = data;
    //   });
  }

  public addCategory() {
    this.addCategoryView = true;
  }

  public cancelAddCategory() {

    this.addCategoryView = false;

  }

  public submitAddCategory() {


    this.addCategoryView = false;
  }
}
