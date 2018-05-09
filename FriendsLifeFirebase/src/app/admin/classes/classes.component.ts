import { Component, OnInit } from '@angular/core';
import { Class, Category } from '../../models/class.model';
import { ClassService } from '../../services/class/class.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class AdminClassesComponent implements OnInit {

  public selectedClass : Class = new Class();
  public category;
  public selection = {id: null};
  public categories;
  public classes;
  public class;
  public selectedDays;
  public classSelected : boolean = false;
  public afternoon : boolean = false;
  public morning : boolean = false;
  public editingCLass : boolean = false;
  public showClasses : boolean = true;
  public showCategories : boolean = false;
  public daysOfWeek = [
    {"id":1,"itemName":"Monday", "abr":"M"},
    {"id":2,"itemName":"Tuesday","abr":"Tu"},
    {"id":3,"itemName":"Wednesday","abr":"W"},
    {"id":4,"itemName":"Thursday","abr":"Th"},
    {"id":5,"itemName":"Friday","abr":"F"}
  ];

  public classesAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cs : ClassService) { }

  ngOnInit() {
    this.cs.getClasses((data)=>{
      this.classes = data;
    });
    this.classesAddForm = this.formBuilder.group({
      id: null,
      category: '',
      days: [],
      morning: false,
      afternoon: false
    });
  }

  public createClass() {
    this.classSelected = true;
    this.cs.addClass(this.selectedClass);
  }

  public categoryAdd(form) {
    form.value.category = this.category;
    form.value.daysDisplay = this.cs.formatDaysforDisplay(form.value.days);
    form.value.timesDisplay = this.cs.formatTimesforDisplay(form.value.morning, form.value.afternoon);
    let category = this.categoryFormat(form);

    if (this.selectedClass.categories == undefined) {
      this.selectedClass.categories = [];
    }

    this.selectedClass.categories.push(category);
    this.cs.updateClass(this.selectedClass);
    this.selectedClass = null;
    this.resetForm(form);
  }

  public onCategoryClick(category) {
    this.selection = category;
    this.afternoon = category.afternoon;
    this.morning = category.morning;
    this.category = {"id": category.id, "name": category.name, "description": category.description, "activities": category.activities};
    this.selectedDays = category.days;
  }

  public categoryEdit(form) {
    form.value.daysDisplay = this.cs.formatDaysforDisplay(form.value.days);
    form.value.timesDisplay = this.cs.formatTimesforDisplay(form.value.morning, form.value.afternoon);
    let category = this.categoryFormat(form);
    for (let i=0; i < this.selectedClass.categories.length; i++) {
      if (this.selectedClass.categories[i].id === category.id) {
        this.selectedClass.categories[i] = category;
        break;
      }
    }

    this.cs.updateClass(this.selectedClass);
    this.resetForm(form);
  }

  public categoryDelete(category) {
    console.log("category", category);
    // let tempArray = [];
    // cat.activities.map(a=> {
    //   if (a.id != act.id) {
    //     tempArray.push(a);
    //   }
    // });
    // cat.activities = tempArray;
    // this.cs.updateCategory(cat);
  }

  public onClassClick(cl) {
    this.selectedClass = Object.assign({}, cl);
    this.editingCLass = true;
  }

  public viewCategories(cl) {
    this.selectedClass = cl;
    this.showCategories = true;
    this.showClasses = false;
  }

  public editClass() {
    this.cs.updateClass(this.selectedClass);
    this.editingCLass = false;
    this.selectedClass = new Class();
  }

  showClass() {
    this.selectedClass = new Class();
    this.showCategories = false;
    this.showClasses = true;
  }

  private resetForm(form) {
    if (form != null) {
      form.reset();
    }
  }

  private categoryFormat(form) {

    let obj = {
      id: form.value.category.id,
      name: form.value.category.name,
      description: form.value.category.description,
      activities: form.value.category.activities,
      days: form.value.days,
      daysDisplay: form.value.daysDisplay,
      morning: form.value.morning,
      afternoon: form.value.afternoon,
      timesDisplay: form.value.timesDisplay
    };

    return Object.assign({obj}, new Category());
  }
}
