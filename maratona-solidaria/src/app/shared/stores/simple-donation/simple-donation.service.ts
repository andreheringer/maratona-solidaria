import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import { UpdateFormValue, UpdateFormDirty } from "@ngxs/form-plugin";
import { discardPeriodicTasks } from "@angular/core/testing";
import getEmpty, { SimpleDonation } from "../../models/simpleDonation";

@Injectable({
  providedIn: "root",
})
export class SimpleDonationService {
  constructor(private store: Store) {}

  @Dispatch()
  private clearFormValues() {
    return new UpdateFormValue({
      path: "simpleDonation.form",
      value: getEmpty(),
    });
  }

  @Dispatch()
  private setFormClean() {
    return new UpdateFormDirty({
      dirty: false,
      path: "simpleDonation.form",
    });
  }

  public clearForm() {
    this.clearFormValues();
    this.setFormClean();
  }
}
