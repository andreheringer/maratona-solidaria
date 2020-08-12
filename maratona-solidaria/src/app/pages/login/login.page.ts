import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../shared/stores/user/user.service";
import { AuthService } from "src/app/core/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.css"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginComponent implements OnInit, OnDestroy {
  public loading = false;
  public returnUrl = "";
  private sub: any;
  public userName = "";
  public userPassw = "";
  public aboutInfo =
    "aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaa";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
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

  public ngOnInit() {}

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public async login() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    this.userName = this.userPassw;
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
