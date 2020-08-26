import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PRODUCTS } from "src/app/shared/models/product";

@Component({
  selector: "app-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.css"],
})
export class AboutComponent implements OnInit, OnDestroy {
  public returnUrl = "";
  private sub: any;
  products = PRODUCTS;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.sub = this.route.queryParams.subscribe((params) => {
      if (params.returnUrl) {
        this.returnUrl = params.returnUrl;
      } else {
        this.returnUrl = "";
      }
    });
  }

  public ngOnInit() {
    const a = this.router.url;
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onClickClassificacao() {}

  public isEven(i: number) {
    return i % 2 === 0 ? true : false;
  }
}
