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
  //   private jwt = new JwtHelperService();

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

  //   public authenticate(iamId: string, password: string): Promise<any> {
  //     const body =
  //       "username=" +
  //       iamId +
  //       "&password=" +
  //       encodeURIComponent(password) +
  //       "&client_id=" +
  //       this.ClientId +
  //       "&grant_type=password&scope=" +
  //       environment.scope;

  //     const headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });

  //     return this.http
  //       .post(this.AuthUri, body, {
  //         headers: headers,
  //       })
  //       .toPromise();
  //   }

  //   public signOut(): Promise<boolean> {
  //     return new Promise<boolean>((resolve, reject) => {
  //       sessionStorage.removeItem(".auth");
  //       sessionStorage.clear();
  //       resolve(true);
  //     });
  //   }
}
