import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { SimpleDonation } from "../../models/simpleDonation";
import { ClearSimpleDonationStore } from "./simple-donation.actions";

const INITIAL_STATE = {
  form: {
    model: new SimpleDonation(),
    dirty: false,
    status: "",
    errors: {},
  },
};

export class SimpleDonationStateModel {
  form: {
    model: SimpleDonation;
    dirty: boolean;
    status: string;
    errors: any;
  };
}

@State<SimpleDonationStateModel>({
  name: "simpleDonation",
  defaults: INITIAL_STATE,
})
@Injectable()
export class SimpleDonationState {
  @Action(ClearSimpleDonationStore)
  public clearSimpleDonationStore({
    setState,
  }: StateContext<SimpleDonationStateModel>) {
    setState(INITIAL_STATE);
  }
}
