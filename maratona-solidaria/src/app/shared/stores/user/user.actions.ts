import { UserStateModel } from "./user.state";

export class UpdateUserState {
  public static readonly type = "[USER] UpdateUserState";
  constructor(public partialUserStateModel: Partial<UserStateModel>) {}
}

export class ClearUserStore {
  public static readonly type = "[USER] ClearUserStore";
}
