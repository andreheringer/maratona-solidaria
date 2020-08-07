import { LoginStateModel } from "./login.state";

export class UpdateLoginState {
  public static readonly type = "[LOGIN] UpdateLoginState";
  constructor(public partialLoginStateModel: Partial<LoginStateModel>) {}
}

export class ClearLoginStore {
  public static readonly type = "[LOGIN] ClearLoginStore";
}
