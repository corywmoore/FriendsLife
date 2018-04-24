import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService]
})
export class AuthModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuard]
    }
  }
}
