import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ITokenService } from "../common/interfaces/auth/token.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject("ITokenService")
    private readonly tokenService: ITokenService,
    @Inject(Reflector)
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      "isPublic",
      context.getHandler()
    );

    if (isPublic) {
      return true;
    }

    let authHeader = "";
    const contextType = context.getType<"http" | "graphql">();
    if (contextType == "graphql") {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();

      authHeader = req?.headers?.authorization;
    } else if (contextType == "http") {
      const request = context.switchToHttp().getRequest();

      authHeader = request?.headers?.authorization;
    } else {
      throw Error("Unrecognized context type");
    }

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    try {
      const token = await this.tokenService.parseToken(authHeader);
      return !!token.userId;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
