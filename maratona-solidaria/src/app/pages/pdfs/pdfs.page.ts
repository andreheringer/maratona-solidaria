import { PDFService } from "./../../shared/stores/pdf/pdf.service";
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import pdfs from "src/app/shared/models/pdf";

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

  constructor(
    private router: Router,
    private pdfService: PDFService,
    private route: ActivatedRoute
  ) {
    this.sub = this.route.queryParams.subscribe((params) => {
      if (params.returnUrl) {
        this.returnUrl = params.returnUrl;
      } else {
        this.returnUrl = "";
      }
    });

    pdfService.setPath(pdfs.find((pdf) => pdf.name === "Regulamento").path);
  }

  ngAfterViewInit() {
    this.objectElement.nativeElement.data = this.pdfService.getPath();
    this.iframeElement.nativeElement.src = this.pdfService.getPath();
  }

  public ngOnInit() {}

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
