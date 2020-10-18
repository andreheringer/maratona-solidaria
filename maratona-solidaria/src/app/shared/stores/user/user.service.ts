import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { UserStateModel } from './user.state';
import { ClearUserStore, UpdateUserState } from './user.actions';
import { Permission } from '../../enums/permission';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { AuthRepository } from 'src/app/core/repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private store: Store, private authRepo: AuthRepository) {}

  private getStore() {
    return this.store.snapshot().user as UserStateModel;
  }

  @Dispatch()
  private clearUserStore() {
    return new ClearUserStore();
  }

  @Dispatch()
  private updateUserState(partialUserStateModel: Partial<UserStateModel>) {
    return new UpdateUserState(partialUserStateModel);
  }

  public authenticate(email: string, password: string): Observable<any> {
    const obs = this.authRepo.login(email, password);
    obs.subscribe((response) => {
      localStorage.setItem('token', response.auth_token);
      this.syncUser(response);
    });
    return obs;
  }

  public refreshUser(token: string): Observable<any> {
    const obs = this.authRepo.refresh(token);
    obs.subscribe((response) => {
      this.syncUser(response);
    });
    return obs;
  }

  public logout(): Observable<any> {
    const token = localStorage.getItem('token');
    this.clearUserStore();
    const obs = this.authRepo.logout(token);
    obs.subscribe((resp) => {
      debugger;
      localStorage.removeItem('token');
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

  public syncUser(response) {
    this.updateUserState({
      user: {
        data: {
          teamId: response.equipe_id,
        },
        permission: response.is_admin ? Permission.admin : Permission.user,
      },
    });
  }

  public syncByUser(user: User) {
    this.updateUserState({
      user: user,
    });
  }
}
