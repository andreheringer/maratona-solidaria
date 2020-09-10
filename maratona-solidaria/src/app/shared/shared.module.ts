import { TeamState } from './stores/teams/teams.state';
import { StudentState } from './stores/students/students.state';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DonationState } from "./stores/donations/donations.state";

@NgModule({
  declarations: [DonationState, StudentState, TeamState],
  imports: [CommonModule],
  exports: [DonationState, StudentState, TeamState],
})
export class SharedModule {}
