import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    const headers = new HttpHeaders()
        .set('Authorization','B37C60B6C25DC12E3809D89D85A75E92')
        .set('Content-Type',  'application/json');

    console.log("headers", headers);
    return headers;
  }

  getCategories() {
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
