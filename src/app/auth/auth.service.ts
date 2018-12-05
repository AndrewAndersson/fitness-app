import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }
  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password.toString()
      ).then(res => {
        console.log(res);
        this.athSuccessfuly();
      }).catch(err => {
        console.log(err);
      });
  }
  login(authData: AuthData) {
   this.afAuth.auth.signInWithEmailAndPassword(
     authData.email,
     authData.password
     ).then(res => {
      console.log(res);
      this.athSuccessfuly();
     }).catch(err => {
      console.log(err);
     });
  }
  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);

  }
  getUser() {
    return {...this.user};
  }
  isAuth() {
    return this.user != null;
  }
  athSuccessfuly() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
