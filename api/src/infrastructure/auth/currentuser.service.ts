import { Inject, Injectable } from "@nestjs/common";
import { ICurrentUserService } from "src/application/common/services/auth/currentuser.interface";
import { HttpSessionService } from "./httpsession.service";

@Injectable()
export class CurrentUserService implements ICurrentUserService
{
  constructor(
    @Inject(HttpSessionService) private http: HttpSessionService
  ){}

  public getUserId(): number { 
    
    console.log(this.http.getAuthorizationHeader())
    
    return 1;
  }
  public getUserEmail(): string { return ""; }
  public getSessionStartTime(): number { return 0o0; }
  public getSessionId(): string { return ""; }
}