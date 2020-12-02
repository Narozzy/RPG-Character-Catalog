import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isAuthenticated = false;
  private user: User;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/tabs']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.isAuthenticated = true;
        this.router.navigate(['/tabs/dm-view']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}