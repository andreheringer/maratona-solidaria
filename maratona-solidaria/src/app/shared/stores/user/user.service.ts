import { Injectable } from "@angular/core";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import { Store } from "@ngxs/store";
import { UserStateModel } from "./user.state";
import { ClearUserStore, UpdateUserState } from "./user.actions";
import { Permission } from "../../enums/permission";
import { AuthService } from "src/app/core/middleware/auth.service";
import { User } from "../../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private store: Store, private authService: AuthService) {}

  private getStore() {
    return this.store.snapshot().user as UserStateModel;
  }

  /**
   * Limpa a pilha de items do User
   */
  @Dispatch()
  public clearUserStore() {
    return new ClearUserStore();
  }

  @Dispatch()
  private updateUserState(partialUserStateModel: Partial<UserStateModel>) {
    return new UpdateUserState(partialUserStateModel);
  }

  /**
   * Retorna o STATE do User
   */
  public getUser(): UserStateModel {
    return this.getStore();
  }

  public getUserPermission(): Permission {
    return this.getUser().permission;
  }

  public updateUser(user: User) {
    this.updateUserState({ user });
  }

  /**
   * Atualiza no STATE os dados cadastrais do usuário
   */
  public syncUser() {
    // this.updateUserState({
    //   user: {
    //     email: this.authService.authenticated ? this.authService.tokenData[TOKEN_FIELDS.EMAIL] : "",
    //     iamId: this.authService.authenticated
    //       ? this.authService.tokenData[TOKEN_FIELDS.USER_ID]
    //       : "",
    //     userName: this.authService.authenticated
    //       ? this.authService.tokenData[TOKEN_FIELDS.USER_NAME]
    //       : "",
    //   },
    // });
  }
}
