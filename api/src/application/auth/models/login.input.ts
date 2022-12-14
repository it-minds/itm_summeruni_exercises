import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class LoginInput {
  @Field()
  @ApiProperty()
  username: string;

  @Field()
  @ApiProperty()
  password: string;
}
