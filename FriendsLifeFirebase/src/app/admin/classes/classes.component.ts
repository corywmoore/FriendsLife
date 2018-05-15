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
  public selectedCategory;
  public category = {id: null};
  public categories;
  public classes;
  public class;
  public selectedDays;
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
      selectedCategory: '',
      days: [],
      morning: false,
      afternoon: false
    });
  }

  public createClass() {
    this.cs.addClass(this.selectedClass);
  }

  public categoryAdd(form) {
    form.value.category = this.categories.find((elem)=>{return elem.id === this.selectedCategory});
    form.value.category.uiId = Date.now();
    form.value.daysDisplay = this.cs.formatDaysforDisplay(form.value.days);
    form.value.timesDisplay = this.cs.formatTimesforDisplay(form.value.morning, form.value.afternoon);
    let category = this.categoryFormat(form);

    if (this.selectedClass.categories == undefined) {
      this.selectedClass.categories = [];
    }

    this.selectedClass.categories.push(category);
    this.cs.updateClass(this.selectedClass);
    this.selectedCategory = null;
    this.resetForm(form);
  }

  public onCategoryClick(category) {
    this.category = category;
    this.selectedCategory = category.id;
    this.afternoon = category.afternoon;
    this.morning = category.morning;
    this.selectedDays = category.days;
  }

  public categoryEdit(form) {
    form.value.category = this.category;
    form.value.daysDisplay = this.cs.formatDaysforDisplay(form.value.days);
    form.value.timesDisplay = this.cs.formatTimesforDisplay(form.value.morning, form.value.afternoon);
    let category = this.categoryFormat(form);
    for (let i=0; i < this.selectedClass.categories.length; i++) {
      if (this.selectedClass.categories[i].uiId === category.uiId) {
        this.selectedClass.categories[i] = category;
        break;
      }
    }

    this.cs.updateClass(this.selectedClass);
    this.selectedCategory = null;
    this.category.id = null;
    this.resetForm(form);
  }

  public categoryDelete(category) {
    let tempArray = [];
    this.selectedClass.categories.map(c=> {
      if (c.uiId != category.uiId) {
        tempArray.push(c);
      }
    });
    this.selectedClass.categories = tempArray;
    this.cs.updateClass(this.selectedClass);
  }

  public onClassClick(cl) {
    this.selectedClass = Object.assign({}, cl);
    this.editingCLass = true;
  }

  public viewCategories(cl) {
    this.selectedClass = cl;
    this.cs.getCategories((data)=> {
      this.categories = data;
    });
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

    return Object.assign({
      uiId: form.value.category.uiId,
      id: form.value.category.id,
      name: form.value.category.name,
      description: form.value.category.description,
      activities: form.value.category.activities,
      imageUrl: form.value.category.imageUrl,
      days: form.value.days,
      daysDisplay: form.value.daysDisplay,
      morning: form.value.morning ? form.value.morning : false,
      afternoon: form.value.afternoon ? form.value.afternoon : false,
      timesDisplay: form.value.timesDisplay
    }, new Category());
  }
}
