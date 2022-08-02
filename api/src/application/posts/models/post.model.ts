import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field()
  text: string;

  @Field((type) => Int)
  timestamp: number;

  constructor(input: Partial<Post> = {}) {
    Object.assign(this, input)
  }
}
