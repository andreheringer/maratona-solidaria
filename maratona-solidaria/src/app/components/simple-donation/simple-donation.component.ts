import { Component, OnInit } from "@angular/core";
import products from "src/app/shared/models/product";

@Component({
  selector: "app-simple-donation",
  templateUrl: "./simple-donation.component.html",
  styleUrls: ["./simple-donation.component.css"],
})
export class SimpleDonationComponent implements OnInit {
  products = products;
  constructor() {}

  ngOnInit(): void {}
}
