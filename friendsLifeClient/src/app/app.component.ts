import { Component } from '@angular/core';
import { AdminService } from './services/admin/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public user;
  public localStorage = localStorage;
  constructor(private adminService : AdminService) { }

  ngOnInit() {
  }

  logOut() {
    this.adminService.logOut();
  }
}
