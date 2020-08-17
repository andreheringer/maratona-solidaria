import { Action, State, StateContext, Selector } from "@ngxs/store";
import { Permission } from "../../enums/permission";
import { ClearUserStore, UpdateUserState } from "./user.actions";
import { User } from "../../models/user";

const INITIAL_STATE = {
  user: {
    data: null,
    permission: null,
  },
  auth: false,
};

export class UserStateModel {
  public user: User;
  public auth: boolean;
}

@State<UserStateModel>({
  name: "user",
  defaults: INITIAL_STATE,
})
export class UserState {
  @Action(ClearUserStore)
  public clearUserStore({ setState }: StateContext<UserStateModel>) {
    setState(INITIAL_STATE);
  }

  @Action(UpdateUserState)
  public updateUserState(
    { patchState }: StateContext<UserStateModel>,
    { partialUserStateModel }: UpdateUserState
  ) {
    patchState(partialUserStateModel);
    patchState({
      auth: true,
    });
  }
}
