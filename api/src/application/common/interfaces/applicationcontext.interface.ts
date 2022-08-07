import { AuthorEntity } from "src/domain/author.entity";
import { PostEntity } from "src/domain/post.entity";
import { ReactionEntity } from "src/domain/reaction.entity";
import { Tracking } from "src/infrastructure/persistance/tracking";

export interface EntityRepository<T, U extends keyof T> {
  // getRandomNameFake(): Promise<NameFake>;
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;

  queryForMany(input: Partial<T>): Promise<T[]>;
  queryForFirst(input: Partial<T>): Promise<T | undefined>;
  queryForOne(input: Partial<T>): Promise<T>;

  delete(author: T): Tracking<T>;
  update(author: T): Tracking<T>;
  add(author: Omit<T, U>): Tracking<T>;
  saveChanges(): Promise<Tracking<T>[]>;
}

export interface IApplicationContext {
  posts: EntityRepository<PostEntity, "id">;
  authors: EntityRepository<AuthorEntity, "id">;
  reactions: EntityRepository<ReactionEntity, "id">;
}
