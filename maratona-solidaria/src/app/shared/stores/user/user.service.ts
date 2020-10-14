import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { UserStateModel } from './user.state';
import { ClearUserStore, UpdateUserState } from './user.actions';
import { Permission } from '../../enums/permission';
import { User } from '../../models/user';
import { HttpHeaders, HttpHandler, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthRepository } from 'src/app/core/repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private helper = new JwtHelperService();
  constructor(
    private store: Store,
    private http: HttpClient,
    private authRepo: AuthRepository
  ) {}

  private getStore() {
    return this.store.snapshot().user as UserStateModel;
  }

  @Dispatch()
  public clearUserStore() {
    return new ClearUserStore();
  }

  @Dispatch()
  private updateUserState(partialUserStateModel: Partial<UserStateModel>) {
    return new UpdateUserState(partialUserStateModel);
  }

  public authenticate(email: string, password: string): Observable<any> {
    const obs = this.authRepo.login(email, password);
    obs.subscribe((user) => {
      this.syncUser(user.auth_token);
    });
    return obs;
  }

  public refreshUser(token: string): Observable<any> {
    const obs = this.authRepo.refresh(token);
    obs.subscribe((user) => {
      this.syncUser(user.auth_token);
    });
    return obs;
  }

  public getAuth(): boolean {
    return this.getStore().auth;
  }

  public getUser(): User {
    return this.getStore().user;
  }

  public getUserPermission(): Permission {
    return this.getStore().user.permission;
  }

  public updateUser(user: User) {
    this.updateUserState({ user });
  }

  public syncUser(token) {
    const tokenDaata = this.helper.decodeToken(token);
    this.updateUserState({
      user: {
        data: tokenDaata,
        permission: Permission.admin,
      },
    });
  }

  public syncByUser(user: User) {
    this.updateUserState({
      user: user,
    });
  }
}
