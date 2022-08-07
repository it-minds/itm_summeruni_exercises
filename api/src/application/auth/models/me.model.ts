import { ObjectType, Field, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Author } from "src/application/authors/models/author.model";

@ObjectType()
export class Me extends Author {
  @Field((type) => String)
  @ApiProperty()
  sessionId: string;

  @Field((type) => Float)
  @ApiProperty()
  sessionStartTime: number;

  constructor(input: Partial<Me> = {}) {
    super(input);
    Object.assign(this, input);
  }
}
