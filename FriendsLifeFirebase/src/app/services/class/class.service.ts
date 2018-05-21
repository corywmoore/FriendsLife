import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { QuerySnapshot, DocumentReference, DocumentSnapshot } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ClassService {
  classesCollection: AngularFirestoreCollection<any> = this.afs.collection('classes');
  categoriesCollection: AngularFirestoreCollection<any> = this.afs.collection('categories');
  selectionsCollection: AngularFirestoreCollection<any> = this.afs.collection('selections');
  classes: Observable<any[]>;

  constructor(private afs : AngularFirestore) { }

  getCategories(cb) {
    let tempArray = [];
    this.categoriesCollection.ref.get().then((qs)=> {
      qs.forEach((doc)=> {
        const data = doc.data();
        const id = doc.id;
        tempArray.push(Object.assign({id, ...data}));
      });

      cb(tempArray);
    });
  }

  getClasses(cb) {
    this.classes = this.classesCollection.snapshotChanges().map(actions => {
      return actions.map(a=> {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });

    this.classes.subscribe(data => cb(data));
  }

  getClassesById(id: string) {
    return this.selectionsCollection.doc(id).ref
      .get()
      .then((selectionSnap: DocumentSnapshot) => {
        if (selectionSnap.exists) {
          const selection = selectionSnap.data();
          localStorage.setItem('selectionId', selectionSnap.data().id);
          return this.classesCollection.doc(selection.classesId).ref
            .get()
            .then((classesSnap: DocumentSnapshot) => {
              if (classesSnap.exists) {
                let cl = classesSnap.data();
                cl.classesId = selection.classesId;
                return cl;
              } else {
                console.log('no classes found with that id');
              }
            });
        } else {
          console.log('no selectionId');
        }
      });
  }

  addClass(cl) {
    this.classesCollection.add({
      name: cl.name,
    });
  }

  updateClass(cl) {
    this.classesCollection.doc(cl.id).update({
      "name": cl.name,
      "categories": (cl.categories.length > 0) ? cl.categories : []
    });
  }

  formatDaysforDisplay(days) {
    let tempArray = [];
    days.map(d=>{
      tempArray.push(d.abr);
    });

    return tempArray.join(',');
  }

  formatTimesforDisplay(morn, aft) {
    if (morn && aft) {
      return 'AM/PM'
    } else if (morn && !aft) {
      return 'AM'
    } else if (!morn && aft) {
      return 'PM'
    }
  }

}
