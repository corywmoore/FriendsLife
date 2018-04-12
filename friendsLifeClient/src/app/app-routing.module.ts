import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AvailabilityComponent } from './availability/availability.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'friends-life-34lk5j3', component: AdminComponent },
  { path: 'availability', component: AvailabilityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
