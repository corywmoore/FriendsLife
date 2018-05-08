import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Upload } from '../../models/upload/upload';
import * as firebase from 'firebase';

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
      "activities": (category.activities.length > 0) ? category.activities : [],
      "imageUrl": category.imageUrl
    });
  }

  addImage(upload: Upload, category) {
    try {
      console.log(0);
      console.log('upload', upload);
      const storageRef = firebase.storage().ref();
      console.log(0.1);
      const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
      console.log(0.2);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          const snap = snapshot;
          console.log(1);
        }, (error) => {
          console.log(2);

          console.log(error);
        }, () => {
          //success
          console.log(3);

          if (uploadTask.snapshot.downloadURL) {
            console.log(4);

            category.imageUrl = uploadTask.snapshot.downloadURL;
            this.updateCategory(category);
          }
        }
      )

    } catch (err) {
      console.log(100);
      console.log(err);
    }
  }

  deleteImage(category) {
    category.imageUrl = '';
    this.updateCategory(category);
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

}
