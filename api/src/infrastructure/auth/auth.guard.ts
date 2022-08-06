import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IHttpSessionService } from "../../application/common/interfaces/auth/httpsession.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject("IHttpSessionService")
    private readonly httpSessionService: IHttpSessionService,
    @Inject(Reflector)
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    console.log("GUARD - AuthGuard")

    const isPublic = this.reflector.get<boolean>(
      "isPublic",
      context.getHandler()
    );

    if (isPublic) {
      return true;
    }

    try {
      const request = this.httpSessionService.getRequestFromContext(context);
      const token = await this.httpSessionService.getTokenFromRequest(request);
      return !!token.userId;
    } catch(err) {
      console.error(err)
      throw new UnauthorizedException();
    }
  }
}
