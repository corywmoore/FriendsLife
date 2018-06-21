import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';
import { ClassService } from '../../services/class/class.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class AdminExportComponent implements OnInit {
  public classes;
  public exportDataForm: FormGroup;
  public selectedClass;

  selections: any;
  reportsRef: AngularFirestoreCollection<any>;
  reports: any;

  constructor(
    private afs: AngularFirestore,
    private svcClass: ClassService,
    private formBuilder: FormBuilder
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
    const data = {
      status: 'processing',
      createdAt: new Date()
    };

    this.reportsRef.add(data);
  }

}
