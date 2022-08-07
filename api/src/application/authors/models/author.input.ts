import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class NewAuthor {
  @Field()
  @ApiProperty()
  username: string;

  @Field()
  @ApiProperty()
  password: string;
}
