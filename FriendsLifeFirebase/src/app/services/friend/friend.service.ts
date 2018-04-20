import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FriendService {
  friendsCollection: AngularFirestoreCollection<any> = this.afs.collection('friends');
  friends: Observable<any[]>;

  constructor(private afs : AngularFirestore) { }



  getFriends(cb) {
    this.friends = this.friendsCollection.snapshotChanges().map(actions => {
      return actions.map(a=> {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
       return {id, ...data};
      });
    });

  this.friends.subscribe(data => cb(data));
  }

  addFriend(friend) {
    this.friendsCollection.add(friend);
  }

  deleteFriend(friend) {
    this.friendsCollection.doc(friend).delete();
  }

  updateFriend(friend) {

  }
}
