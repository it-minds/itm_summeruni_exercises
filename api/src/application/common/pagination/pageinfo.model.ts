import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PageInfo {
  @Field((type) => Boolean)
  hasPreviousPage: boolean;
  @Field((type) => Boolean)
  hasNextPage: boolean;

  @Field((type) => String, { nullable: true })
  endCursor?: string;

  constructor(input: Partial<PageInfo> = {}) {
    Object.assign(this, input);
  }
}
