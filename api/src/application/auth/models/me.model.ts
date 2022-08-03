import { ObjectType, Field, Float } from "@nestjs/graphql";
import { Author } from "src/application/authors/models/author.model";

@ObjectType()
export class Me extends Author {
  @Field((type) => String)
  sessionId: string;

  @Field((type) => Float)
  sessionStartTime: number;

  constructor(input: Partial<Me> = {}) {
    super(input);
    Object.assign(this, input);
  }
}
