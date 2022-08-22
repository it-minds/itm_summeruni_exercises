import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
export class Post {
  @Field()
  @ApiProperty()
  id: string;

  @Field()
  @ApiProperty()
  text: string;

  @Field((type) => Int)
  @ApiProperty()
  authorId: number = null;

  @Field((type) => Int, { nullable: true })
  @ApiProperty({ nullable: true, required: false })
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
