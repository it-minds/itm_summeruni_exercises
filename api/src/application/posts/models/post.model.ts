import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

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
  relyId: number = null;

  @Field((type) => Int, { nullable: true })
  @ApiProperty({ nullable: true, required: false })
  repostId: number = null;

  @Field((type) => Float)
  @ApiProperty()
  timestamp: number;

  constructor(input: Partial<Post> = {}) {
    Object.assign(this, input);
  }
}
