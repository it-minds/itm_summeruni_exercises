import { Field, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
export class PageInfo {
  @Field((type) => Boolean)
  @ApiProperty()
  hasPreviousPage: boolean;
  @Field((type) => Boolean)
  @ApiProperty()
  hasNextPage: boolean;

  @Field((type) => String, { nullable: true })
  @ApiProperty({ nullable: true })
  endCursor?: string;

  constructor(input: Partial<PageInfo> = {}) {
    Object.assign(this, input);
  }
}
