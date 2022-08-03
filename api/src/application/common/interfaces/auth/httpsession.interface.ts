import { JWT, Token } from "../../token.type";

export interface IHttpSessionService {
  getAuthToken(): Promise<JWT & Token>;
}
