import { JWT, Token } from "../../token.type";

export interface ITokenService {
  generateToken(tokenObj: Token): Promise<string>;
  parseToken(token: string): Promise<JWT & Token>;

  hashPassword(password: string): Promise<string>;

  comparePassword(password: string, hash: string): Promise<boolean>;
}
