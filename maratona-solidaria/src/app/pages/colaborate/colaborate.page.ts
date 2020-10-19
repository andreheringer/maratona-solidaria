import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-colaborate",
  templateUrl: "./colaborate.page.html",
  styleUrls: ["./colaborate.page.css"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ColaborateComponent implements OnInit, OnDestroy {
  public returnUrl = "";
  private sub: Subscription;
  public donation = true;
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
  public isEven(i: number) {
    return i % 2 === 0 ? true : false;
  }

  changeform(event){
    
    this.donation = !this.donation;
  }
}
