export class AuthorEntity {
  id: number;

  name: string;
  password: string;

  imageUrl?: string = null;

  constructor(partial: Partial<AuthorEntity>) {
    Object.assign(this, partial);
  }
}
