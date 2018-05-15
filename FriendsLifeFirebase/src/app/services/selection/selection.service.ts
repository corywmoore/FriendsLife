import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Friend } from '../../models/friend.model';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import 'rxjs/add/operator/map';
import { QuerySnapshot, DocumentReference } from '@firebase/firestore-types';

@Injectable()
export class SelectionService {
  selectionsCollection: AngularFirestoreCollection<any>;
  classesCollection: AngularFirestoreCollection<any>;
  categoriesCollection: AngularFirestoreCollection<any>;

  selections: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.selectionsCollection = this.afs.collection('selections');
    this.categoriesCollection = this.afs.collection('categories');
  }

  getSelection(uId: string, classesId: string): Promise<boolean> {
    return this.selectionsCollection.ref
      .where('uId', '==', uId)
      .where('classesId', '==', classesId)
      .get()
      .then((snapshot: QuerySnapshot) => {
        if (!snapshot.empty) {
          const selectionSnap = snapshot.docs[0];
          localStorage.setItem('selectionId', selectionSnap.id);
          console.log(localStorage.getItem('selectionId'));
          return true;
        } else {
          console.log('no selectionId');
          return false;
        }
      });
  }

  createSelection(uId: string, classesId: string): Promise<string> {
    return this.selectionsCollection.ref.add({
      uId: uId,
      classesId: classesId
    }).then((docRef: DocumentReference) => {
      localStorage.setItem('selectionId', docRef.id);
      return docRef.id;
    });
  }
}
