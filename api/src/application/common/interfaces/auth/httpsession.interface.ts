import { ExecutionContext } from "@nestjs/common";
import { JWT, Token } from "../../token.type";
import { Request } from "express";

export interface IHttpSessionService {
  getTokenFromRequest(request: Request): Promise<JWT & Token>;
  getRequestFromContext(context: ExecutionContext): Request;
}
