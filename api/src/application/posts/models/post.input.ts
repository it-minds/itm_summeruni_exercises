import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class NewPost {
  @Field()
  @ApiProperty()
  text: string;
}
