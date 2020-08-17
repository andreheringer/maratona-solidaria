import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/stores/user/user.service";
import { Router } from "@angular/router";
import { MENUOPTIONS, Option } from "src/app/shared/models/menu-options";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public authenticated: boolean;
  public options: Option[];
  constructor(private router: Router, private userService: UserService) {
    this.authenticated = userService.getAuth();
    this.options = MENUOPTIONS;
  }

  ngOnInit(): void {
    if (this.authenticated) {
      this.options.find((item) => item.path === this.router.url).active = false;
    }
  }

  public onClickOption(path) {
    this.router.navigateByUrl(path);
  }
}
