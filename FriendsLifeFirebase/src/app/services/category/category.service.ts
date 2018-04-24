import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class CategoryService {
  categoriesCollection: AngularFirestoreCollection<any> = this.afs.collection('categories');
  categories: Observable<any[]>;

  constructor(private afs : AngularFirestore) { }

  getFriends(cb) {
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
      "description": category.description
    });
  }

}
