export class AuthorEntity {
  id: number;

  firstName: string;
  lastName: string;

  constructor(partial: Partial<AuthorEntity>) {
    Object.assign(this, partial);
  }
}
