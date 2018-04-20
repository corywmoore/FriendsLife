import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin/admin.component';
import { HomeComponent } from './home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FriendComponent } from './friend/friend.component';
import { AvailabilityComponent } from './availability/availability.component';
import { AdminCategoriesComponent } from './admin/categories/categories.component';
import { UsersComponent } from './admin/users/users.component';
import { ActivitiesComponent } from './activities/activities.component';
import { SelectionsComponent } from './selections/selections.component';
import { FriendsComponent } from './admin/friends/friends.component';
import { AdminActivitiesComponent } from './admin/activities/activities.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './services/admin/admin.service';
import { SelectionService } from './services/selection/selection.service';
import { CategoriesComponent } from './categories/categories.component';
import { AuthModule } from './services/auth/auth.module';
import { NotificationModule } from './services/notification/notification.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    FriendComponent,
    AvailabilityComponent,
    AdminCategoriesComponent,
    UsersComponent,
    ActivitiesComponent,
    SelectionsComponent,
    FriendsComponent,
    AdminActivitiesComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AuthModule,
    NotificationModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [AdminService, SelectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
