import { Component, OnInit } from '@angular/core';
import { Class } from '../../models/class.model';
import { ClassService } from '../../services/class/class.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class AdminClassesComponent implements OnInit {

  public selectedClass : Class = new Class();
  public classSelectView : boolean = true;
  public existingClassView : boolean = false;
  public classSelected : boolean = false;
  public selection = {id: null};
  public categories;
  public classes;
  public selectedDays;
  public daysOfWeek = [
    {"id":1,"itemName":"Monday"},
    {"id":2,"itemName":"Tuesday"},
    {"id":3,"itemName":"Wednesday"},
    {"id":4,"itemName":"Thursday"},
    {"id":5,"itemName":"Friday"}
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

  classAdd(form) {
    console.log("form", form);
  }

  newClass() {
    this.classSelectView = false;
  }

  existingClass() {
    this.cs.getClasses((data)=>{
      this.classes = data;
      this.classSelectView = false;
      this.existingClassView = true;
    });
  }

  createClass() {
    console.log("this", this);
    this.classSelected = true;
  }

  categoryAdd(form) {

  }

  categoryEdit(form) {

  }

  onCategoryClick(category) {
    this.selection = category;
  }

  categoryDelete(category) {

  }

}
