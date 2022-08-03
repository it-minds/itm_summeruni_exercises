import { Inject, Injectable, Req, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class HttpSessionService {

  constructor(@Inject(REQUEST) private readonly request: Request) {}


  public getAuthorizationHeader() {
    //@ts-ignore
    const headers : Request["headers"] = this.request.req.headers ;
    return headers.authorization
  }
}