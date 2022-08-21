import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Post } from "src/application/posts/models/post.model";

@ObjectType()
export class Author {
  @Field()
  @ApiProperty()
  id: string;

  @Field({ nullable: true })
  @ApiProperty({ nullable: true })
  username?: string;

  posts: Post[];

  constructor(input: Partial<Author> = {}) {
    Object.assign(this, input);
  }
}
