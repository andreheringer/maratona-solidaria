import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";

@State({
  name: "login",
  defaults: {
    newLoginForm: {
      model: undefined,
      dirty: false,
      status: "",
      errors: {},
    },
  },
})
@Injectable()
export class LoginState {}
