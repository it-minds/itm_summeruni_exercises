import { Injectable } from "@nestjs/common";
import { ITokenService } from "src/application/common/interfaces/auth/token.interface";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { JWT, Token } from "src/application/common/token.type";
import { v4 as uuid } from "uuid";

const split = "$_$";

@Injectable()
export class TokenService implements ITokenService {
  constructor(private jwtService: JwtService) {}

  async generateToken(tokenObj: Token): Promise<string> {
    const token = await this.jwtService.signAsync(tokenObj, {
      secret: "secret",
      expiresIn: "12h",
      jwtid: uuid(),
    });

    return token;
  }

  async parseToken(token: string): Promise<JWT & Token> {
    const tokenObj = await this.jwtService.verifyAsync(token, {
      secret: "secret",
    });

    return tokenObj;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(password, salt);

    return `${hash}${split}${salt}`;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const [hashPassword] = hash.split(split);

    const isMatch = await bcrypt.compare(password, hashPassword);

    return isMatch;
  }
}
