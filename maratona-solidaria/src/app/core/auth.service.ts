import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

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

  constructor(private http: HttpClient) {}

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

  public authenticate(userName: string, password: string) {
    let body = JSON.stringify({
      email: userName,
      password: password,
    });
    const header = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post(environment.apiUrl + "auth/login", body, {
      headers: header,
    });
  }

  //   public signOut(): Promise<boolean> {
  //     return new Promise<boolean>((resolve, reject) => {
  //       sessionStorage.removeItem(".auth");
  //       sessionStorage.clear();
  //       resolve(true);
  //     });
  //   }
}
