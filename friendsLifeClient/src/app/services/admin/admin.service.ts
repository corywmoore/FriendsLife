import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }


  getCategories() {
    this.http.get('https://mighty-hollows-34327.herokuapp.com/fl/category').subscribe(
      data => {
        console.log(data);
      });
  }

}
