import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class CategoryService {
  categoriesCollection: AngularFirestoreCollection<any> = this.afs.collection('categories');
  categories: Observable<any[]>;

  constructor(private afs : AngularFirestore) { }

  getCategories(cb) {
    this.categories = this.categoriesCollection.snapshotChanges().map(actions => {
      return actions.map(a=> {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
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
      "activities": (category.activities.length > 0) ? category.activities : []
    });
  }

  getActivityCategories(cb) {
    let tempArray = [];
    this.categoriesCollection.ref.get().then((qs)=> {
      qs.forEach((doc)=> {
        const data = doc.data();
        const id = doc.id;
        tempArray.push({id, ...data});
      });

      cb(tempArray);
    });
  }

}
