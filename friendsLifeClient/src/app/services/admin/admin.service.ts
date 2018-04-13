import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    const headers = new HttpHeaders()
        .set('Authorization','405F3E83BE6F8B217F8D33613897F74C')
        .set('Content-Type',  'application/json');

    return headers;
  }

  getCategories() {
    this.http.get('https://mighty-hollows-34327.herokuapp.com/fl/category', {headers: this.getHeaders()}).subscribe(
      data => {
        console.log(data);
      });
  }

  getFriends() {
    this.http.get('https://mighty-hollows-34327.herokuapp.com/fl/category', {headers: this.getHeaders()}).subscribe(
      data => {
        console.log(data);
      });
  }

  logIn(userId, pw) {
    this.http.get(`https://mighty-hollows-34327.herokuapp.com/login?loginId=${userId}&password=${pw}`, {}).subscribe(
      data => {
        console.log(data);
      });
  }

}
