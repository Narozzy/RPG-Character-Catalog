import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  isNotSignedIn = true;

  constructor(
    private afAuthenticate: AngularFireAuth
  ) {}

  doGoogleLogin(event: any) {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuthenticate.signInWithPopup(provider)
      .then(res => {
        console.log(event);
        this.isNotSignedIn = false;
        resolve(res);
      })
      .catch(err =>
        console.error(err)  
      );
    });
  }
}
