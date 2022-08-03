export class AuthorEntity {
  id: number;

  name: string;
  password: string;

  constructor(partial: Partial<AuthorEntity>) {
    Object.assign(this, partial);
  }
}
