import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import products from "src/app/shared/models/product";

@Component({
  selector: "app-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.css"],
})
export class AboutComponent implements OnInit, OnDestroy {
  public returnUrl = "";
  private sub: any;
  products = products;

  constructor(private router: Router, private route: ActivatedRoute) {
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

  public navigateToLogin() {
    this.router.navigateByUrl("/login");
  }
}
