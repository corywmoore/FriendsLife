import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Friend } from '../../models/friend.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SelectionService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    const headers = new HttpHeaders()
        .set('Authorization','B37C60B6C25DC12E3809D89D85A75E92')
        .set('Content-Type',  'application/json');

    console.log("headers", headers);
    return headers;
  }
  
  addFriend(friend: Friend): Observable<any> {
    return this.http.post('https://mighty-hollows-34327.herokuapp.com/fl/createFriend', friend, {headers: this.getHeaders()});
  }
}




