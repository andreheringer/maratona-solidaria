import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../shared/stores/user/user.service";
import { LoginService } from "../../shared/stores/login/login.service";
import { AuthService } from "src/app/core/auth.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loading = false;
  public returnUrl = "";
  private sub: any;
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService,
    private loginService: LoginService
  ) {
    this.checkLogin();

    this.sub = this.route.queryParams.subscribe((params) => {
      if (params.returnUrl) {
        this.returnUrl = params.returnUrl;
      } else {
        this.returnUrl = "";
      }
    });
  }

  onSubmit() {
    if (this.loginService.validatePassword()) {
      confirm("Password validated");
    } else {
      this.loginService.clearPassword(this.loginForm);
    }
  }

  public ngOnInit() {}

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public async login() {
    this.loading = true;
  }

  private checkLogin() {
    if (this.auth.authenticated) {
      this.loadStates();
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  private loadStates() {
    this.userService.syncUser();
  }
}
