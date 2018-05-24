import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class AdminExportComponent implements OnInit {
  selections: any;
  reportsRef: AngularFirestoreCollection<any>;
  reports: any;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
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
