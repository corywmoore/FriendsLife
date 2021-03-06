import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FriendComponent } from './friend/friend.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AvailabilityComponent } from './availability/availability.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminCategoriesComponent } from './admin/categories/categories.component';
import { ActivitiesComponent } from './activities/activities.component';
import { SelectionsComponent } from './selections/selections.component';
import { FriendsComponent } from './admin/friends/friends.component';
import { AdminActivitiesComponent } from './admin/activities/activities.component';
import { CategoriesComponent  } from './categories/categories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'friend', component: FriendComponent },
  { path: 'friends-life-management', component: AdminComponent },
  { path: 'availability', component: AvailabilityComponent },
  { path: 'friends-life-management/categories', component: AdminCategoriesComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'friends-life-management/users', component: UsersComponent },
  { path: 'selections', component: SelectionsComponent },
  { path: 'friends-life-management/friends', component: FriendsComponent },
  { path: 'friends-life-management/activities', component: AdminActivitiesComponent },
  { path: 'categories', component: CategoriesComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
