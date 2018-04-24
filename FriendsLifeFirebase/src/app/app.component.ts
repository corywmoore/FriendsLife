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
    this.auth.user.subscribe(user => {
      this.isLoggedIn = !!user && !!user.uid;
    });
  }

  logOut() {
    this.auth.signOut();
  }
}
