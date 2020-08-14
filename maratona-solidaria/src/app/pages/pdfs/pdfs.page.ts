import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-pdfs",
  templateUrl: "./pdfs.page.html",
  styleUrls: ["./pdfs.page.css"],
})
export class PDFComponent implements OnInit, OnDestroy, AfterViewInit {
  public returnUrl = "";
  private sub: any;
  @ViewChild("object") objectElement: ElementRef;
  @ViewChild("iframe") iframeElement: ElementRef;
  filePath = "./assets/pdf/Regulamento-Maratona-Solidária.pdf";

  constructor(private router: Router, private route: ActivatedRoute) {
    this.sub = this.route.queryParams.subscribe((params) => {
      if (params.returnUrl) {
        this.returnUrl = params.returnUrl;
      } else {
        this.returnUrl = "";
      }
    });
  }

  ngAfterViewInit() {
    this.objectElement.nativeElement.data = this.filePath;
    this.iframeElement.nativeElement.data = this.filePath;
  }

  public ngOnInit() {}

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
