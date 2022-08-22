import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReactionType } from "src/domain/reaction.entity";

@ObjectType()
export class Reaction {
  @Field()
  @ApiProperty()
  authorId: string;

  @Field()
  @ApiProperty()
  postId: string;

  @Field((type) => ReactionType)
  @ApiProperty({ enum: Object.values(ReactionType) })
  reaction: ReactionType;

  constructor(input: Partial<Reaction> = {}) {
    Object.assign(this, input);
  }
}

registerEnumType(ReactionType, {
  name: "ReactionType",
});
