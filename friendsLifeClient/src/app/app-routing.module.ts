import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FriendComponent } from './friend/friend.component';
import { AdminComponent } from './admin/admin.component';
import { AvailabilityComponent } from './availability/availability.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'friend', component: FriendComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'friends-life-management', component: AdminComponent },
  { path: 'availability', component: AvailabilityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
