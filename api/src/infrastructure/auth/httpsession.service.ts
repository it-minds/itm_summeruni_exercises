import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { IHttpSessionService } from "src/application/common/interfaces/auth/httpsession.interface";
import { ITokenService } from "src/application/common/interfaces/auth/token.interface";

@Injectable({ scope: Scope.REQUEST })
export class HttpSessionService implements IHttpSessionService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @Inject("ITokenService")
    private tokenService: ITokenService
  ) {}

  private getAuthorizationHeader() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const headers: Request["headers"] = this.request.req.headers;
    return headers.authorization;
  }

  public async getAuthToken() {
    const authString = this.getAuthorizationHeader();
    return await this.tokenService.parseToken(authString);
  }
}
