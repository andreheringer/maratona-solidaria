import { SimpleDonationService } from "./../../shared/stores/simple-donation/simple-donation.service";
import { Component, OnInit } from "@angular/core";
import products from "src/app/shared/models/product";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-simple-donation",
  templateUrl: "./simple-donation.component.html",
  styleUrls: ["./simple-donation.component.css"],
})
export class SimpleDonationComponent implements OnInit {
  products = products;
  newSimpleDonationForm = new FormGroup({
    name: new FormControl(),
    product: new FormControl(),
    quantity: new FormControl(),
    student: new FormControl(),
    date: new FormControl(),
    obs: new FormControl(),
  });

  constructor(private simpleDonationService: SimpleDonationService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.newSimpleDonationForm.value);
    this.simpleDonationService.clearForm();
  }
}
