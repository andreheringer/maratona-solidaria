import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { UserState } from './../app/shared/stores/user/user.state';
import { NgxsModule } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';
import { UserService } from './../app/shared/stores/user/user.service';

describe('UserService', () => {
  let store: Store;
  let userService: UserService;
  let jwtHelper: JwtHelperService;
  const userStub = {
    data: {
      exp: 1602203311,
      iat: 1602199711,
      sub: 1,
      permission: 2
    },
    permission: 2
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UserState]), HttpClientModule, NgxsDispatchPluginModule]
    });

    store = TestBed.inject(Store);
    userService = TestBed.inject(UserService);
    jwtHelper = new JwtHelperService();
  });


  it('should start with null user properties', () => {
    const user = userService.getUser();

    expect(user).toEqual({data: null, permission: null});
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


  it('should sync user from token', () => {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDIyMDMzMTEsImlhdCI6MTYwMjE5OTcxMSwic3ViIjoxLCJwZXJtaXNzaW9uIjoyfQ.hLQbubNY1Y9uIdYXCWOutGSRIj9YN-jE2BG15FGjjpw";

    userService.syncUser(token);
    const user = userService.getUser();

    expect(user).toEqual(userStub);
  });

});