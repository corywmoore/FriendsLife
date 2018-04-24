import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isLoggedIn = false;

  private onUserUpdated: any;

  constructor(private auth: AuthService) { 
    this.onUserUpdated = this.auth.userUpdated.subscribe(() => {
      this.isLoggedIn = this.auth.isLoggedIn;
    });
  }

  logOut() {
    this.auth.signOut();
  }
}
