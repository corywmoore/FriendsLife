import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FriendComponent } from './friend/friend.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AvailabilityComponent } from './availability/availability.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { AdminCategoriesComponent } from './admin/categories/categories.component';
import { ActivitiesComponent } from './activities/activities.component';
import { SelectionsComponent } from './selections/selections.component';
import { AdminFriendsComponent } from './admin/friends/friends.component';
import { AdminActivitiesComponent } from './admin/activities/activities.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdminClassesComponent } from './admin/classes/classes.component';

import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'friends-life-management', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'friend', component: FriendComponent, canActivate: [AuthGuard] },
  { path: 'availability', component: AvailabilityComponent, canActivate: [AuthGuard] },
  { path: 'activities', component: ActivitiesComponent, canActivate: [AuthGuard] },
  { path: 'selections', component: SelectionsComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'friends-life-management/categories', component: AdminCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'friends-life-management/users', component: AdminUsersComponent, canActivate: [AuthGuard] },
  { path: 'friends-life-management/friends', component: AdminFriendsComponent, canActivate: [AuthGuard] },
  { path: 'friends-life-management/activities', component: AdminActivitiesComponent, canActivate: [AuthGuard] },
  { path: 'friends-life-management/classes', component: AdminClassesComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
