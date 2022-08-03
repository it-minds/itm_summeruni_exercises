export class AuthorEntity {
  id: number;

  name: string;
  password: string;

  imageUrl?: string;

  constructor(partial: Partial<AuthorEntity>) {
    Object.assign(this, partial);
  }
}
