import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-colaborate",
  templateUrl: "./colaborate.page.html",
  styleUrls: ["./colaborate.page.css"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ColaborateComponent implements OnInit, OnDestroy {
  public returnUrl = "";
  private sub: any;

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
}
