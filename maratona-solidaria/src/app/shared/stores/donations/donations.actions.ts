import { DonationStateModel } from "./donations.state";
import { Donation } from "../../models/donation";

export class ClearDonationStore {
  public static readonly type = "[DONATIONS] ClearDonationsState";
}

export class UpdateDonationsState {
  public static readonly type = "[DONATIONS] UpdateDonationsState";
  constructor(public partialDonationStateModel: Partial<DonationStateModel>) {}
}

export class AppendDonationsState {
  public static readonly type = "[DONATIONS] AppendDonationsState";
  constructor(public newDonation: Donation) {}
}
