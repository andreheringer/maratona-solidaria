import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { UserService } from "src/app/shared/stores/user/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: UserService) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const perm = this.authService.getUserPermission();
    const isAuthenticated = perm !== null;
    if (!isAuthenticated) {
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: state.url },
      });
    }
    console.log(next);

    return isAuthenticated;
  }
}
