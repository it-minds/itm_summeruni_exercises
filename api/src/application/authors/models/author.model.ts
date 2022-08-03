import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "src/application/posts/models/post.model";

// technically a DTO! Do not persist!
@ObjectType()
export class Author {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  username?: string;

  @Field((type) => [Post])
  posts: Post[];

  constructor(input: Partial<Author> = {}) {
    Object.assign(this, input);
  }
}
