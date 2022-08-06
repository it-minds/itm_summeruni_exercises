import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { IHttpSessionService } from "src/application/common/interfaces/auth/httpsession.interface";

@Injectable()
export class HttpSessionMiddleware implements NestMiddleware   {
  constructor(
    @Inject("IHttpSessionService")
    private readonly httpSessionService: IHttpSessionService
  ) {}
  
  
  async use(req: Request, _res: Response, next: NextFunction) {
    const token = await this.httpSessionService.getTokenFromRequest(req)
    req["user-token"] = token
    next();
  }
}
