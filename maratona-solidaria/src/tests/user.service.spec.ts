import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { UserState } from './../app/shared/stores/user/user.state';
import { NgxsModule } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';
import { UserService } from './../app/shared/stores/user/user.service';
import { Observable } from 'rxjs';

const mockedToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOjB9.T9lZ82YomeeceiXejEZo0IRk9g2eVjKCo93a2v34Gyc';

const createAuthRepositoryMock = (): any => {
  return {
    login: () => {
      return new Observable((subscriber) => {
        subscriber.next({
          auth_token: mockedToken,
          equipe_id: 0,
          is_admin: true,
        });
        subscriber.complete();
      });
    },
    refresh: () => {
      return new Observable((subscriber) => {
        subscriber.next({
          equipe_id: 0,
          is_admin: true,
        });
        subscriber.complete();
      });
    },
  };
};

describe('UserService', () => {
  let store: Store;
  let userService: UserService;
  let jwtHelper: JwtHelperService;
  const userStub = {
    data: {
      teamId: 0,
    },
    permission: 2,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UserState]),
        HttpClientModule,
        NgxsDispatchPluginModule,
      ],
    });

    store = TestBed.inject(Store);
    userService = new UserService(store, createAuthRepositoryMock());
    jwtHelper = new JwtHelperService();
  });

  it('should start with null user properties', () => {
    const user = userService.getUser();

    expect(user).toEqual({ data: null, permission: null });
  });

  it('should start with false auth', () => {
    const auth = userService.getAuth();

    expect(auth).toEqual(false);
  });

  it('should update user', () => {
    userService.updateUser(userStub);
    const user = userService.getUser();

    expect(user).toEqual(userStub);
  });

  it('should authenticate', () => {
    userService.authenticate('user', 'password');
    const user = userService.getUser();

    expect(user).toEqual(userStub);
  });

  it('should refresh from token', () => {
    userService.refreshUser(mockedToken);
    const user = userService.getUser();

    expect(user).toEqual(userStub);
  });
});
