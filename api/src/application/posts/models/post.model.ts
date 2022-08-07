import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Reaction } from "./reaction.model";

@ObjectType()
export class Post {
  @Field((type) => Int)
  @ApiProperty()
  id: number;

  @Field()
  @ApiProperty()
  text: string;

  @Field((type) => Int, { nullable: true })
  @ApiProperty({ nullable: true })
  relyId: number;

  @Field((type) => Int, { nullable: true })
  @ApiProperty({ nullable: true })
  repostId: number;

  @Field((type) => Float)
  @ApiProperty()
  timestamp: number;

  reactions: Reaction[];

  constructor(input: Partial<Post> = {}) {
    Object.assign(this, input);
  }
}
