import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import jwtDecode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthenticationService,
    public router: Router
  ) {}

  canActivate(): boolean {
    const accessToken = JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken;
    if (!this.auth.isAuthenticated || new Date().getTime() >= jwtDecode<JwtPayload>(accessToken).exp * 1000) {
      this.router.navigate(["tabs/authentication"]);
      return false;
    }
    return true;
  }
}
