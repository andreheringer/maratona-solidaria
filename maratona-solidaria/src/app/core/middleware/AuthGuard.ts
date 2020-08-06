import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const isAuthenticated = this.authService.authenticated;

    if (!isAuthenticated) {
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: state.url },
      });
    }

    return isAuthenticated;
  }
}
