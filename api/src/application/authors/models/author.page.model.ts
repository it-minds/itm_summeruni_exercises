import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Edge, Page } from "src/application/common/pagination/page.interface";
import { GenericPageGen } from "src/application/common/pagination/pagegen.util";
import { PageInfo } from "src/application/common/pagination/pageinfo.model";
import { Author } from "./author.model";

@ObjectType()
export class AuthorsEdge implements Edge<Author> {
  @Field((type) => Author)
  @ApiProperty({
    type: () => Author,
  })
  node: Author;

  @Field()
  @ApiProperty()
  cursor: string;

  constructor(input: Partial<AuthorsEdge> = {}) {
    Object.assign(this, input);
  }
}

@ObjectType()
export class AuthorsPage implements Page<Author> {
  @Field((type) => Int)
  @ApiProperty()
  totalCount: number;

  @Field((type) => [AuthorsEdge])
  @ApiProperty({
    type: () => [AuthorsEdge],
  })
  edges: AuthorsEdge[];

  @Field((type) => PageInfo)
  @ApiProperty({ type: () => PageInfo })
  pageInfo: PageInfo;

  constructor(input: Partial<AuthorsPage> = {}) {
    Object.assign(this, input);
  }

  public static pageGen = GenericPageGen(
    AuthorsPage,
    AuthorsEdge,
    (x: Author) => btoa(`author-${x.id}`)
  );
}
