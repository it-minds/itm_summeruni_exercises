import { Inject, Injectable } from "@nestjs/common";
import { ICurrentUserService } from "src/application/common/interfaces/auth/currentuser.interface";
import { HttpSessionService } from "./httpsession.service";

@Injectable()
export class CurrentUserService implements ICurrentUserService {
  constructor(@Inject(HttpSessionService) private http: HttpSessionService) {}

  public async getUserId(): Promise<number> {
    const auth = await await this.http.getAuthToken();
    console.log(auth);

    return auth.userId;
  }
  public async getUserEmail(): Promise<string> {
    return "";
  }
  public async getSessionStartTime(): Promise<number> {
    return 0o0;
  }
  public async getSessionId(): Promise<string> {
    return "";
  }
}
