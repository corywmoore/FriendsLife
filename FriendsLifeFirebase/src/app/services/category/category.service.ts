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

  public daySorter = {
    "sunday": 0,
    "monday": 1,
    "tuesday": 2,
    "wednesday": 3,
    "thursday": 4,
    "friday": 5,
    "saturday": 6
  };

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

  addSelectedCategories(selectionId, categories): Promise<string | void> {
    const ref = this.afs.collection('selections').doc(selectionId).collection('categories');
    return ref.add(JSON.parse(JSON.stringify(categories)))
      .then((docRef: DocumentReference) => {
        return docRef.id;
      })
      .catch((err) => {
        console.log(`Error adding categories: ${err}`);
      });
  }

  getSelectedCategories(selection) {
    let ref = this.afs.collection('selections').doc(selection).collection('categories');

    return ref.snapshotChanges().map(actions => {
      return actions.map(a => {
        let data = a.payload.doc.data();
        const id = a.payload.doc.id;
        data = this.orderDays(data);
        return { id, ...data };
      });
    });

  }

  updateSelectedCategories(selection, cat) {
    this.afs.collection('selections').doc(selection).collection('categories').doc(cat.id).set(JSON.parse(JSON.stringify({ categories: cat.categories })))
      .then(() => {
        console.log("Categories updated")
      })
      .catch((err) => {
        console.log(`Error updating categories: ${err}`);
      });
  }

  orderDays(data) {
    data.categories.sort((a, b) => {
      return this.daySorter[a.day.toLowerCase()] - this.daySorter[b.day.toLowerCase()];
    });

    return data;
  }


  filterCategories(data) {
    console.log('data', data);
    let fCats = [];
    let dayName = '';

    for (let day of data.categories) {
      dayName = day.day;

      for (let cat of day.mornCategories.categories) {
        if (cat.selected) {
          cat.day = dayName;
          cat.time = 'Morning';
          cat = this.sortActivities(cat);
          fCats.push(cat);
        }
      }
      for (let cat of day.aftCategories.categories) {
        if (cat.selected) {
          cat.day = dayName;
          cat.time = 'Afternoon';
          cat = this.sortActivities(cat);
          fCats.push(cat);
        }
      }
    }

    return fCats.sort((a, b) => {
      return this.daySorter[a.day.toLowerCase()] - this.daySorter[b.day.toLowerCase()];
    });
  }

  private sortActivities(cat) {
    cat.activities = _.sortBy(cat.activities, (o) => { return o.rank; })
    return cat;
  }
}

