import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field()
  text: string;

  @Field((type) => Int, { nullable: true })
  relyId: number;

  @Field((type) => Float)
  timestamp: number;

  constructor(input: Partial<Post> = {}) {
    Object.assign(this, input);
  }
}
