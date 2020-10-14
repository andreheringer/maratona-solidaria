import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/stores/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StartupService } from 'src/app/core/startup.service';

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
  private helper = new JwtHelperService();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private startupService: StartupService
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
        localStorage.setItem('token', response.auth_token);
        this.startupService.preloadStores()
        this.spinner.hide();
        this.router.navigateByUrl('/leaderboard');
      });
  }

  private checkLogin() {
    let token = localStorage.getItem('token');
    if (token) {
      this.spinner.show();
      this.userService.refreshUser(token).subscribe( (response) => {
        this.startupService.preloadStores()
        this.spinner.hide();
        this.router.navigateByUrl('/leaderboard');
      },
      (error) => {
        this.spinner.hide();
      }
      )
    }
  }
}
