import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  signUp() {
    this.router.navigate(['tabs/sign-up']);
  }
}
