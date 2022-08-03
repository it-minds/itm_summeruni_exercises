import { Inject, Injectable, Scope } from "@nestjs/common";
import { ICurrentUserService } from "src/application/common/interfaces/auth/currentuser.interface";
import { JWT, Token } from "src/application/common/token.type";
import { HttpSessionService } from "./httpsession.service";

@Injectable({ scope: Scope.REQUEST })
export class CurrentUserService implements ICurrentUserService {
  constructor(
    @Inject("IHttpSessionService") private http: HttpSessionService
  ) {}

  private auth: JWT & Token;
  private async getAuth() {
    if (this.auth) return this.auth;
    const auth = await this.http.getAuthToken();
    this.auth = auth;
    return auth;
  }

  public async getUserId(): Promise<number> {
    const auth = await this.getAuth();
    return auth.userId;
  }
  public async getUserEmail(): Promise<string> {
    const auth = await this.getAuth();
    return auth.username;
  }
  public async getSessionStartTime(): Promise<number> {
    const auth = await this.getAuth();
    return auth.iat;
  }
  public async getSessionId(): Promise<string> {
    const auth = await this.getAuth();
    return auth.jti;
  }
}
