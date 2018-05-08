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
  public category : Category = new Category();
  public classSelectView : boolean = true;
  public existingClassView : boolean = false;
  public classSelected : boolean = false;
  public selection = {id: null};
  public categories;
  public classes;
  public class;
  public selectedDays;
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
    this.cs.getCategories((data)=>{
      this.categories = data;
    });
    this.classesAddForm = this.formBuilder.group({
      id: null,
      category: '',
      days: [],
      morning: false,
      afternoon: false
    });
  }

  public classAdd(form) {
    console.log("form", form);
  }

  public newClass() {
    this.classSelectView = false;
  }

  public existingClass() {
    this.cs.getClasses((data)=>{
      this.classes = data;
      this.classSelectView = false;
      this.existingClassView = true;
    });
  }

  public createClass() {
    this.classSelected = true;
    this.cs.addClass(this.selectedClass);
  }

  public classSelect() {
    this.selectedClass = this.class;
    this.classSelected = true;
  }

  public categoryAdd(form) {
    // console.log("this", this);
    // console.log("form", form);
    // debugger;
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
    console.log("category", category);
    console.log("this", this);
    debugger;
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

    return obj;
  }
}
