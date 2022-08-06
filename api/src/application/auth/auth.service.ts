import { Injectable, Inject } from "@nestjs/common";
import { AuthorEntity } from "src/domain/author.entity";
import { AuthorsService } from "../authors";
import { IApplicationContext } from "../common/interfaces/applicationcontext.interface";
import { ICurrentUserService } from "../common/interfaces/auth/currentuser.interface";
import { ITokenService } from "../common/interfaces/auth/token.interface";
import { Token } from "../common/token.type";
import { Me } from "./models/me.model";

@Injectable()
export class AuthService {
  constructor(
    @Inject("IApplicationContext")
    private applicationContext: IApplicationContext,
    @Inject("ITokenService")
    private tokenService: ITokenService,
    @Inject("ICurrentUserService")
    private currentUserService: ICurrentUserService,
    @Inject(AuthorsService) private authorsService: AuthorsService
  ) {}

  async findMe() {
    const id = this.currentUserService.getUserId();
    const author = await this.authorsService.findOneById(id);

    const me = new Me({
      ...author,
      sessionId: await this.currentUserService.getSessionId(),
      sessionStartTime: await this.currentUserService.getSessionStartTime(),
    });

    return me;
  }

  async validateUser(
    username: string,
    pass: string
  ): Promise<[boolean, AuthorEntity]> {
    const user = await this.applicationContext.authors.queryForOne({
      name: username,
    });

    const isValid = await this.tokenService.comparePassword(
      pass,
      user.password
    );

    return [isValid, user];
  }

  async login(username: string, pass: string): Promise<string> {
    const [isValid, user] = await this.validateUser(username, pass);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const tokenObj: Token = {
      username: user.name,
      userId: user.id,
    };

    const token = await this.tokenService.generateToken(tokenObj);

    return token;
  }
}
