import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin/admin.component';
import { HomeComponent } from './home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FriendComponent } from './friend/friend.component';
import { AvailabilityComponent } from './availability/availability.component';
import { AdminCategoriesComponent } from './admin/categories/categories.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { ActivitiesComponent } from './activities/activities.component';
import { SelectionsComponent } from './selections/selections.component';
import { AdminFriendsComponent } from './admin/friends/friends.component';
import { AdminActivitiesComponent } from './admin/activities/activities.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './services/admin/admin.service';
import { SelectionService } from './services/selection/selection.service';
import { FriendService } from './services/friend/friend.service';
import { CategoryService } from './services/category/category.service';
import { CategoriesComponent } from './categories/categories.component';
import { AuthModule } from './services/auth/auth.module';
import { NotificationModule } from './services/notification/notification.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AdminClassesComponent } from './admin/classes/classes.component';
import { ClassService } from './services/class/class.service';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    FriendComponent,
    AvailabilityComponent,
    AdminCategoriesComponent,
    AdminUsersComponent,
    ActivitiesComponent,
    SelectionsComponent,
    AdminFriendsComponent,
    AdminActivitiesComponent,
    CategoriesComponent,
    AdminClassesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AuthModule.forRoot(),
    NotificationModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule,
    AngularMultiSelectModule
  ],
  providers: [AdminService, SelectionService, FriendService, CategoryService, ClassService],
  bootstrap: [AppComponent]
})
export class AppModule { }
