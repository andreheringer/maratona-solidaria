import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/stores/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginComponent implements OnInit, OnDestroy {
  public loading = false;
  public returnUrl = '';
  private sub: Subscription;
  public userName = '';
  public userPassw = '';
  public aboutInfo = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {
    this.checkLogin();

    this.sub = this.route.queryParams.subscribe((params) => {
      if (params.returnUrl) {
        this.returnUrl = params.returnUrl;
      } else {
        this.returnUrl = '';
      }
    });
  }

  public ngOnInit() {}

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public async login() {
    this.spinner.show();
    this.userService
      .authenticate(this.userName, this.userPassw)
      .subscribe((response) => {
        // const b = response["auth_token"];
        this.userService.syncByUser(response);

        this.spinner.hide();
        this.router.navigateByUrl('/about');
      });
  }

  private checkLogin() {
    if (false) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }
}
