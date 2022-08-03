export interface Token {
  userId: number;
  username: string;
}

export interface JWT {
  iat: number;
  jti: string;
}
