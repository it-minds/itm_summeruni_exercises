import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class LoginOutput {
  @Field()
  @ApiProperty()
  token: string;

  constructor(input: Partial<LoginOutput> = {}) {
    Object.assign(this, input);
  }
}
