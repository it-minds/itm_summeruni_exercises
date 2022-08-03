export interface ICurrentUserService {
  getUserId(): Promise<number>;
  getUserEmail(): Promise<string>;

  getSessionStartTime(): Promise<number>;
  getSessionId(): Promise<string>;
}
