import {  ExecutionContext, Inject, Injectable,  Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";
import { IncomingHttpHeaders } from "http";
import { IHttpSessionService } from "src/application/common/interfaces/auth/httpsession.interface";
import { ITokenService } from "src/application/common/interfaces/auth/token.interface";
import { JWT, Token } from "src/application/common/token.type";

type JWTToken = Token & JWT;

@Injectable()
export class HttpSessionService implements IHttpSessionService {
  constructor(
    @Inject("ITokenService")
    private readonly tokenService: ITokenService
  ) {}

  private getHttpRequest( context: ExecutionContext) : Request {
    const request = context.switchToHttp().getRequest();
    return request;
  }

  private getGraphqlRequest( context: ExecutionContext) : Request {
    const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();
      return req;
  }
  
  private getAuthorizationHeader(headers: IncomingHttpHeaders = {}) {
    const authHeader = headers.authorization;

    if (!authHeader) return null;
    
    const [_, token] = authHeader.split("Bearer ");

    return token;
  }

  public getRequestFromContext(context: ExecutionContext) : Request {
    let request: Request;
    const contextType = context.getType<"http" | "graphql">();

    console.log("HTTP SESSION", contextType);
    if (contextType == "graphql") {
      request = this.getGraphqlRequest(context)
    } else if (contextType == "http") {
      request = this.getHttpRequest(context)
    } else {
      throw Error("Unrecognized context type");
    }
    return request;
  }

  public async getTokenFromRequest(request: Request) : Promise<JWTToken> {
    const tokenString = this.getAuthorizationHeader(request.headers)
    const token = await this.tokenService.parseToken(tokenString);
    return token;
  }
}
