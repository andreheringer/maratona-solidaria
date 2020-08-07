import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

export const TOKEN_FIELDS = {
  //   TOKEN: "access_token",
  USER_ID: "sub",
  USER_NAME: "given_name",
};

@Injectable()
export class AuthService {
  //   private AuthUri: string = environment.authUri;
  //   private ClientId: string = environment.clientId;
  //   private jwt = new JwtHelperService(); // autenticacao por jwt ?

  //   constructor(private http: HttpClient) {}

  //   public getToken(): string {
  //     return sessionStorage.getItem(".auth");
  //   }

  //   public setToken(accessToken: string) {
  //     sessionStorage.setItem(".auth", accessToken);
  //   }

  //   get tokenData() {
  //     if (this.getToken() != null) {
  //       return this.jwt.decodeToken(this.getToken());
  //     } else {
  //       return null;
  //     }
  //   }

  get authenticated() {
    return true;
  }

  public authenticate(userName: string, password: string) {}

  //   public signOut(): Promise<boolean> {
  //     return new Promise<boolean>((resolve, reject) => {
  //       sessionStorage.removeItem(".auth");
  //       sessionStorage.clear();
  //       resolve(true);
  //     });
  //   }
}
