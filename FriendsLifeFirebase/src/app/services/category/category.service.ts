import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { QuerySnapshot, DocumentReference, DocumentSnapshot } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Upload } from '../../models/upload/upload';
import * as firebase from 'firebase';
import * as _ from 'underscore';

@Injectable()

export class CategoryService {
  categoriesCollection: AngularFirestoreCollection<any> = this.afs.collection('categories');
  categories: Observable<any[]>;
  basePath = 'uploads/categories';

  constructor(private afs: AngularFirestore) { }

  getCategories(cb) {
    this.categories = this.categoriesCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

    this.categories.subscribe(data => cb(data));
  }

  addCategory(category) {
    this.categoriesCollection.add({
      name: category.name,
      description: category.description
    });
  }

  deleteCategory(category) {
    this.categoriesCollection.doc(category).delete();
  }

  updateCategory(category) {
    this.categoriesCollection.doc(category.id).update({
      "name": category.name,
      "description": category.description,
      "activities": (!!category.activities) ? category.activities : [],
      "imageUrl": (!!category.imageUrl) ? category.imageUrl : ''
    });
  }

  addCategoryImage(upload: Upload, category) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => {
        const snap = snapshot;
      }, (error) => {
        console.error(error);
      }, () => {
        //success
        if (uploadTask.snapshot.downloadURL) {
          category.imageUrl = uploadTask.snapshot.downloadURL;
          this.updateCategory(category);
        }
      }
    );
  }

  addActivityImage(upload: Upload, activity, category) {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${category.name}/${activity.name}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => {
        const snap = snapshot;
      }, (error) => {
        console.error(error);
      }, () => {
        //success
        if (uploadTask.snapshot.downloadURL) {
          activity.imageUrl = uploadTask.snapshot.downloadURL;
          this.updateCategory(category);
        }
      });
  }

  getActivityCategories(cb) {
    let tempArray = [];
    this.categoriesCollection.ref.get().then((qs) => {
      qs.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        tempArray.push({ id, ...data });
      });

      cb(tempArray);
    });
  }

  addSelectedCategories(selectionId, categories): Promise<string> {
    const ref = this.afs.collection('selections').doc(selectionId).collection('categories');
    return ref.add(JSON.parse(JSON.stringify(categories)))
      .then((docRef: DocumentReference) => {
        return docRef.id;
      });
  }

}
