import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { CONTEXT } from "@nestjs/graphql";
import { ICurrentUserService } from "src/application/common/interfaces/auth/currentuser.interface";
import { JWT, Token } from "src/application/common/token.type";

@Injectable({
  scope: Scope.REQUEST
})
export class CurrentUserService implements ICurrentUserService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @Inject(CONTEXT) private readonly context
  ) {}

  private getAuth(): JWT & Token {
    if (this.context.req) {
      return this.context.req["user-token"];
    }

    return this.request["user-token"]
  }

  public getUserId= (): number => this.getAuth()?.userId;
  public getUserEmail = (): string => this.getAuth()?.username;
  public getSessionStartTime = (): number => this.getAuth()?.iat;
  public getSessionId = (): string => this.getAuth()?.jti;
}
