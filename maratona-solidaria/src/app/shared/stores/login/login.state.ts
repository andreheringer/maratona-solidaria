import { State } from "@ngxs/store";
import { FormGroup, FormControl } from "@angular/forms";

const INITIAL_STATE = {
  loginForm: new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  }),
};

export class LoginStateModel {
  public loginForm: FormGroup;
}

@State<LoginStateModel>({
  name: "login",
  defaults: INITIAL_STATE,
})
export class LoginState {}
