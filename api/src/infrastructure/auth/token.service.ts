import { Inject, Injectable } from "@nestjs/common";
import { ITokenService } from "src/application/common/interfaces/auth/token.interface";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { JWT, Token } from "src/application/common/token.type";
import { v4 as uuid } from "uuid";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "src/application/common/interfaces/environment.interface";

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {}

  async generateToken(tokenObj: Token): Promise<string> {
    const token = await this.jwtService.signAsync(tokenObj, {
      secret: this.configService.get("AUTH_TOKEN_SECRET"),
      expiresIn: "12h",
      jwtid: uuid(),
    });

    return token;
  }

  async parseToken(token: string): Promise<JWT & Token> {
    const tokenObj = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get("AUTH_TOKEN_SECRET"),
    });

    return tokenObj;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
