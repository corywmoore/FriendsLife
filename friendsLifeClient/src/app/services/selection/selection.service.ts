import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Friend } from '../../models/friend.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SelectionService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    const headers = new HttpHeaders()
        .set('Authorization', sessionStorage.getItem("userToken"))
        .set('Content-Type',  'application/json');

    return headers;
  }

  addFriend(friend: Friend): Observable<any> {
    return this.http.post('https://mighty-hollows-34327.herokuapp.com/fl/createFriend', friend, {headers: this.getHeaders()});
  }
}




