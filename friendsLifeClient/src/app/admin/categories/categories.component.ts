import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categories;

  public addCategoryView = false;

  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.categories = this.adminService.getCategories();
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
