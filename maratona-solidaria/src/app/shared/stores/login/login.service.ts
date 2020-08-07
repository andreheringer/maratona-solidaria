import { FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { LoginStateModel } from "./login.state";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import { ClearLoginStore, UpdateLoginState } from "./login.actions";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private store: Store) {}

  private getStore() {
    return this.store.snapshot().login as LoginStateModel;
  }

  @Dispatch()
  public clearLoginStore() {
    return new ClearLoginStore();
  }

  @Dispatch()
  private updateLoginState(partialLoginStateModel: Partial<LoginStateModel>) {
    return new UpdateLoginState(partialLoginStateModel);
  }

  public updateLogin(loginForm: FormGroup) {
    this.updateLoginState({ loginForm });
  }

  public clearPassword(loginForm: FormGroup) {
    loginForm.setValue({ password: "" });
    this.updateLoginState({
      loginForm: loginForm,
    });
  }

  public validatePassword() {
    return this.getStore().loginForm.controls["password"].value === "123";
  }
}
