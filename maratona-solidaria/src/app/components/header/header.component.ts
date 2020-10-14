import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/stores/user/user.service';
import { Router } from '@angular/router';
import { MENUOPTIONS, Option } from 'src/app/shared/models/menu-options';
import { User } from 'src/app/shared/models/user';
import { Permission } from 'src/app/shared/enums/permission';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public authenticated: boolean;
  public options: Option[];
  public userPerm: Permission;
  public current: number;
  public logout: boolean = false;
  constructor(private router: Router, private userService: UserService) {
    this.authenticated = userService.getAuth();
    if (this.authenticated) {
      this.userPerm = userService.getUserPermission();
      this.logout = true;
    } else {
      this.userPerm = Permission.visitor;
    }
    this.options = MENUOPTIONS;
  }

  ngOnInit(): void {
    this.current = this.options.findIndex(
      (item) => item.path === this.router.url.split('?')[0]
    );
  }

  public onClickOption(path) {
    this.router.navigateByUrl(path);
  }

  logof(){
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  logOption(path){
    return !this.logout || path !== '/login';
  }
}
