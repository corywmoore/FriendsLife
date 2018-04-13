import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
// import {Observable} from 'rxjs/Observble';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  public categories;

  public addCategoryView = false;

  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.adminService.getCategories().subscribe(
      data => {
        this.categories = data;
      });
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
