import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import { UpdateFormValue, UpdateFormDirty } from "@ngxs/form-plugin";
import { discardPeriodicTasks } from "@angular/core/testing";
import { ClearSimpleDonationStore } from "./simple-donation.actions";

@Injectable({
  providedIn: "root",
})
export class SimpleDonationService {
  constructor(private store: Store) {}

  @Dispatch()
  private clearFormStore() {
    return new ClearSimpleDonationStore();
  }

  public clearForm() {
    this.clearFormStore();
  }
}
