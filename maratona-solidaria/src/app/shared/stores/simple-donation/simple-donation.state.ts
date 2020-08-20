import { Injectable } from "@angular/core";
import { State, Action } from "@ngxs/store";
import { SimpleDonation } from "../../models/simpleDonation";

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
  defaults: {
    form: {
      model: undefined,
      dirty: false,
      status: "",
      errors: {},
    },
  },
})
@Injectable()
export class SimpleDonationState {}
