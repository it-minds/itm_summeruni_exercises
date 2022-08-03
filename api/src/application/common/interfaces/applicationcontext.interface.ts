import { AuthorEntity } from "src/domain/author.entity";
import { PostEntity } from "src/domain/post.entity";

export interface EntityRepository<T> {
  // getRandomNameFake(): Promise<NameFake>;
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;

  queryForMany(input: Partial<T>): Promise<T[]>;
  queryForFirst(input: Partial<T>): Promise<T>;
  queryForOne(input: Partial<T>): Promise<T>;

  delete(author: T): void;
  update(author: T): void;
  add(author: T): void;
  saveChanges(): Promise<void>;
}

export interface IApplicationContext {
  posts: EntityRepository<PostEntity>;
  authors: EntityRepository<AuthorEntity>;
}
