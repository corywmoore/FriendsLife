import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AdminService {

  constructor(private http: HttpClient, private router: Router) { }

  getHeaders() {
    const headers = new HttpHeaders()
        .set('Authorization', sessionStorage.getItem("userToken"))
        .set('Content-Type',  'application/json');

    return headers;
  }

  getCategories(): Observable <any> {
    return this.http.get('https://mighty-hollows-34327.herokuapp.com/fl/category', {headers: this.getHeaders()});

  }

  logIn(userId, pw) {
    this.http.post(`https://mighty-hollows-34327.herokuapp.com/login?loginId=${userId}&password=${pw}`, {}).subscribe(
      (data:any)=> {
        localStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem('userToken', data.token);
        this.router.navigate(['friend']);
      });
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
