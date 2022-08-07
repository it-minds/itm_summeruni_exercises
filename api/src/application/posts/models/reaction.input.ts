import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReactionType } from "src/domain/reaction.entity";

@InputType()
export class ReactionInput {
  @Field((type) => ReactionType)
  @ApiProperty({ enum: Object.values(ReactionType) })
  reaction: ReactionType;
}
