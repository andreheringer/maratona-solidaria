import { Injectable } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { DonationStateModel, DonationState } from "./donations.state";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import {
  ClearDonationStore,
  UpdateDonationsState,
  AppendDonationsState,
} from "./donations.actions";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Donation } from "../../models/donation";
import { Permission } from "../../enums/permission";
import { SimpleDonation } from "../../models/simpleDonation";

@Injectable({
  providedIn: "root",
})
export class DonationService {
  constructor(private store: Store) {}

  private getStore() {
    return this.store.snapshot().user as DonationStateModel;
  }

  @Dispatch()
  public clearDonationsStore() {
    return new ClearDonationStore();
  }

  @Dispatch()
  private updateDonationsState(
    partialDonationStateModel: Partial<DonationStateModel>
  ) {
    return new UpdateDonationsState(partialDonationStateModel);
  }

  @Dispatch()
  private appendDonationsState(donation: Donation) {
    return new AppendDonationsState(donation);
  }

  @Select(DonationState.allDonations)
  public allDonations$: Observable<Donation[]>;

  @Select(DonationState.teamDonations)
  public teamDonations$: Observable<Donation[]>;

  public updateAllDonations(donations: Donation[]) {
    this.updateDonationsState({ allDonations: donations });
  }

  public updateTeamDonations(donations: Donation[]) {
    this.updateDonationsState({ teamDonations: donations });
  }

  public donate(donation: SimpleDonation) {
    //post donation
    this.appendDonationsState(donation);
  }
}
