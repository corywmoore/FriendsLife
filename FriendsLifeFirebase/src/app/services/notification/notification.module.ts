import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotificationService } from './notification.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [NotificationService]
})
export class NotificationModule { }
