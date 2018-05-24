import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Friend } from '../../models/friend.model';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import 'rxjs/add/operator/map';
import { QuerySnapshot, DocumentReference, DocumentSnapshot } from '@firebase/firestore-types';
import { SelectionModel, AvailabilityModel } from './selection.models';

@Injectable()
export class SelectionService {
  selectionsCollection: AngularFirestoreCollection<any>;
  classesCollection: AngularFirestoreCollection<any>;
  categoriesCollection: AngularFirestoreCollection<any>;

  selections: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.selectionsCollection = this.afs.collection('selections');
    this.categoriesCollection = this.afs.collection('categories');
    this.classesCollection = this.afs.collection('classes');
  }

  getSelectionByFriend(uId: string, classesId: string): Promise<boolean> {
    return this.selectionsCollection.ref
      .where('uId', '==', uId)
      .where('classesId', '==', classesId)
      .get()
      .then((snapshot: QuerySnapshot) => {
        if (!snapshot.empty) {
          const selectionSnap = snapshot.docs[0];
          localStorage.setItem('selectionId', selectionSnap.id);
          return true;
        } else {
          return false;
        }
      });
  }

  createSelection(classesId: string, friend: any): Promise<string> {
    return this.selectionsCollection.ref.add({
      uId: friend.id,
      classesId: classesId,
      firstName: friend.firstName,
      lastName: friend.lastName,
      nickName: friend.nickName
    }).then((docRef: DocumentReference) => {
      localStorage.setItem('selectionId', docRef.id);
      return docRef.id;
    });
  }

  getSelection(selectionId: string): Observable<DocumentSnapshot> {
    return this.selectionsCollection
      .doc(selectionId)
      .snapshotChanges()
      .map(doc => {
        return doc.payload;
      });
  }

  getAvailabilities(selectionId: string): Observable<any[]> {
    let ref = this.afs.collection('selections').doc(selectionId).collection('availabilities');

    return ref.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as AvailabilityModel[];
        const id = a.payload.doc.id;

        return {id, ...data};
      });
    });
  }

  updateSelection(selectionId, selection: SelectionModel) {
    return this.selectionsCollection
      .doc(selectionId)
      .update(selection)
      .then(() => {
        console.log(`${selectionId} updated`);
      }).catch((error) => {
        console.error(`error updating document ${selectionId}`, error);
      });
  }

  addAvailability(selectionId, availability: AvailabilityModel): Promise<string> {
    const ref = this.afs.collection('selections').doc(selectionId).collection('availabilities');
    return ref.add(JSON.parse(JSON.stringify(availability)))
      .then((docRef: DocumentReference) => {
        return docRef.id;
      });
  }

  deleteAvailability(selectionId: string, availabilityId): Promise<boolean> {
    const ref = this.afs.collection('selections').doc(selectionId).collection('availabilities');

    return ref.doc(availabilityId)
      .delete()
      .then(() => {
        return true;
      }).catch(() => {
        return false;
      });
  }
}
