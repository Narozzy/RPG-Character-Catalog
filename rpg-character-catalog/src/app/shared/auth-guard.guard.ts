import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthenticationService,
    public router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const user = localStorage.getItem("user");
    console.log(`USER FROM AUTHGUARD: ${user}`);
    console.log(`EXPECTED ROLE FROM AUTH GUARD: ${expectedRole}`);
    if (!this.auth.isAuthenticated) {
      this.router.navigate(["tabs/authentication"]);
      return false;
    }
    return true;
  }
}
