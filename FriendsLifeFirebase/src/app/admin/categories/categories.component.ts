import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  public categories;
  public selectedCategory : Category = new Category();
  public addCategoryView: boolean = false;

  constructor(private cs : CategoryService) { }

  ngOnInit() {
    this.cs.getCategories((data)=>{
      this.categories = data;
    });
  }

  public onCategoryClick(category) {
    this.selectedCategory = Object.assign({},category);
  }

  public categoryAdd(category) {
    this.cs.addCategory(category.value);
    this.resetForm(category);
  }

  public categoryEdit(category) {
    this.cs.updateCategory(category.value);
    this.resetForm(category);
  }

  public categoryDelete(category) {
    this.cs.deleteCategory(category.id);
  }

  private resetForm(form? : NgForm) {
    if (form != null) {
      form.reset();
    }
    this.selectedCategory = Object.assign({},new Category());
  }
}
