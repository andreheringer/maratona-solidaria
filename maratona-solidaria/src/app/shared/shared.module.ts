import { StudentState } from './stores/students/students.state';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DonationState } from "./stores/donations/donations.state";

@NgModule({
  declarations: [DonationState, StudentState],
  imports: [CommonModule],
  exports: [DonationState, StudentState],
})
export class SharedModule {}
