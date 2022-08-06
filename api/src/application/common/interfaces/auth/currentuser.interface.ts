export interface ICurrentUserService {
  getUserId(): number;
  getUserEmail(): string;

  getSessionStartTime(): number;
  getSessionId(): string;
}
