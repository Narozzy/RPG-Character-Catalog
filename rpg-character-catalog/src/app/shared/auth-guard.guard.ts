import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthenticationService,
    public router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const accessToken = JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken;
    console.log(`decoded token: ${JSON.stringify(decode(accessToken))}`);
    if (!this.auth.isAuthenticated || new Date().getTime() >= (decode(accessToken) as JwtPayload).exp * 1000) {
      this.router.navigate(["tabs/authentication"]);
      return false;
    }
    return true;
  }
}
