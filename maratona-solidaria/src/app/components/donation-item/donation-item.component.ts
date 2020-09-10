import { Component, OnInit, Input } from "@angular/core";
import { Donation } from "src/app/shared/models/donation";

@Component({
  selector: "app-donation-item",
  templateUrl: "./donation-item.component.html",
  styleUrls: ["./donation-item.component.css"],
})
export class DonationItemComponent implements OnInit {
  @Input("donation") donation: Donation;
  constructor() {}

  ngOnInit(): void {}
}
