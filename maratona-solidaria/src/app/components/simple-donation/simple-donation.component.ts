import { SimpleDonationService } from "./../../shared/stores/simple-donation/simple-donation.service";
import { Component, OnInit } from "@angular/core";
import { PRODUCTS, Product } from "src/app/shared/models/product";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-simple-donation",
  templateUrl: "./simple-donation.component.html",
  styleUrls: ["./simple-donation.component.css"],
})
export class SimpleDonationComponent implements OnInit {
  products = PRODUCTS;
  donation: boolean = false;
  student: boolean = false;
  private sub: Subscription;
  newSimpleDonationForm = new FormGroup({
    doacao: new FormControl(),
    tipo: new FormControl(),
    quantidade: new FormControl(),
    representante_id: new FormControl(),
    data: new FormControl(),
    pontuacao: new FormControl(),
    observacao: new FormControl(),
  });

  constructor(private simpleDonationService: SimpleDonationService) {}

  ngOnInit(): void {
    this.donationTypeChangeHandler();
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    debugger;
    this.simpleDonationService.clearForm();
  }
  onDonationChange() {
    this.donation = true;
  }

  private donationTypeChangeHandler() {
    this.newSimpleDonationForm.get("tipo").valueChanges.subscribe((tipo) => {
      console.log(tipo);
      if (tipo) {
        this.newSimpleDonationForm.controls["pontuacao"].setValue(
          this.products.find((prod) => prod.id === tipo).points
        );
      }
    });
  }

  onStudentChange() {
    this.student = true;
  }
}
