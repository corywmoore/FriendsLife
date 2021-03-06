import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category.model';
import { Activity } from '../../models/activity.model';
import { NgForm } from '@angular/forms';
import * as _ from 'underscore';
import { Upload } from '../../models/upload/upload';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class AdminActivitiesComponent implements OnInit {

  public selectedCategory: Category = new Category();
  public selectedActivity: Activity = new Activity();
  public categories;
  public activityFiles: any[] = [];

  constructor(private cs: CategoryService) { }

  ngOnInit() {
    this.cs.getActivityCategories((data) => {
      this.categories = data;
    });
  }

  public onActivityClick(act) {
    this.selectedActivity = Object.assign({}, act);
  }

  public categoryChange(e) {
    this.resetForm();
  }

  public activityAdd(cat, act) {
    if (cat.activities == undefined) {
      cat.activities = [];
    }

    cat.activities.push({ id: Date.now(), name: act.name });
    this.cs.updateCategory(cat);
    this.resetForm();

  }

  activityEdit(cat, act) {
    for (let i = 0; i < cat.activities.length; i++) {
      if (cat.activities[i].id === act.id) {
        cat.activities[i] = act;
        break;
      }
    }

    this.cs.updateCategory(cat);
    this.resetForm();
  }

  activityDelete(cat, act) {
    let tempArray = [];
    cat.activities.map(a => {
      if (a.id != act.id) {
        tempArray.push(a);
      }
    });
    cat.activities = tempArray;
    this.cs.updateCategory(cat);
  }

  detectFile($event, activity) {
    activity.imageUpload = true;
    this.activityFiles.push({
      file: ($event.target as HTMLInputElement).files[0],
      actId: activity.id
    });
  }

  addImage(cat, act) {
    let actFile = _.find(this.activityFiles, item => {
      return item.actId === act.id;
    });

    this.cs.addActivityImage(new Upload(actFile.file), act, cat);
  }

  deleteImage(cat, act) {
    act.imageUrl = '';
    this.cs.updateCategory(cat);
  }

  private resetForm() {
    this.selectedActivity = Object.assign({}, new Activity());
  }

}
