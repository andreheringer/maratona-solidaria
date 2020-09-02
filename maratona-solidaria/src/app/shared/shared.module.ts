import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DonationState } from "./stores/donations/donations.state";

@NgModule({
  declarations: [DonationState],
  imports: [CommonModule],
  exports: [DonationState],
})
export class SharedModule {}
