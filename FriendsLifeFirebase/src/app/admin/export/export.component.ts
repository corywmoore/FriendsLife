import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';
import { ClassService } from '../../services/class/class.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectionService } from '../../services/selection/selection.service';
import { QuerySnapshot, DocumentSnapshot } from '@firebase/firestore-types';
import { query } from '@angular/core/src/animation/dsl';
import { CategoryService } from '../../services/category/category.service';
import * as json2csv from 'json2csv';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class AdminExportComponent implements OnInit {
  public classes;
  public exportDataForm: FormGroup;
  public selectedClass;
  public class;

  selections: any;
  reportsRef: AngularFirestoreCollection<any>;
  reports: any;

  constructor(
    private afs: AngularFirestore,
    private svcClass: ClassService,
    private formBuilder: FormBuilder,
    private svcSelection: SelectionService,
    private categoryService: CategoryService,
    // private j2c: json2csv
  ) { }

  ngOnInit() {
    this.svcClass.getClasses((data) => {
      this.classes = data;
    });

    this.exportDataForm = this.formBuilder.group({
      id: null,
      selectedClass: '',
    });

    this.selections = this.afs.collection('selections').valueChanges();
    this.reportsRef = this.afs.collection('reports');

    this.reports = this.reportsRef
      .snapshotChanges().map(arr => {
        return arr.map(snap => {
          const data = snap.payload.doc.data();
          const id = snap.payload.doc.id;
          return { ...data, id };
        })
      });
  }

  requestReport() {
    let list: any[] = [];
    let that = this;

    this.selections = this.svcSelection.getSelections(this.class.id).then(function (querySnapshot) {
      querySnapshot.forEach(function (documentSnapshot) {
        var data = documentSnapshot.data();
        let item: any = {};

        that.csv(item);

        item.FirstName = data.firstName;
        item.Nickname = data.nickName;
        item.LastName = data.lastName;
        item.selectionId = data.uId;
        item.classesId = data.classesId;

        that.categoryService.getSelectedCategories(documentSnapshot.id).subscribe((data: any) => {
          if(data && data[0] && data[0].categories && data[0].categories) {
            for(let i=0; i<data[0].categories.length; i++) {
              let cat = data[0].categories[i];
              let day = cat.day;
              
              if(cat.mornCategories && cat.mornCategories.categories && cat.mornCategories.categories.length > 0) {
                that.getSelectedCategories(cat.mornCategories.categories, item, day + '_morn_');
              }
              if(cat.aftCategories && cat.aftCategories.categories && cat.aftCategories.categories.length > 0) {
                that.getSelectedCategories(cat.aftCategories.categories, item, day + '_aft_');
              }
            }
          }
          console.log('item', item);
        });

        list.push(item);
      });
    });
  }

  getSelectedCategories(obj, item, base) {
    for(let i=0; i<obj.length; i++) {
      if(obj[i].selected) {
        item[base + 'name'] = obj[i].name;
        for(let j=0; j<obj[i].activities.length; j++) {
          item[base + 'name_activities_' + j] = obj[i].activities[j].name;
          item[base + 'name_activities_' + j + '_rank'] = obj[i].activities[j].rank;
        }
      }
    }
  }

  csv(item) {
    setTimeout(() => {
      console.log('result', json2csv({data: item}));
    }, 10000);
  }
}
