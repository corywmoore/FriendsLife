import { Component } from '@angular/core';
import { AdminService } from './services/admin/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private adminService : AdminService) { }

  logOut() {
    this.adminService.logOut();
  }
}
