import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Edge, Page } from "src/application/common/pagination/page.interface";
import { GenericPageGen } from "src/application/common/pagination/pagegen.util";
import { PageInfo } from "src/application/common/pagination/pageinfo.model";
import { Reaction } from "./reaction.model";

@ObjectType()
export class ReactionsEdge implements Edge<Reaction> {
  @Field((type) => Reaction)
  @ApiProperty({
    type: () => Reaction,
  })
  node: Reaction;

  @Field()
  @ApiProperty()
  cursor: string;

  constructor(input: Partial<ReactionsEdge> = {}) {
    Object.assign(this, input);
  }
}

@ObjectType()
export class ReactionsPage implements Page<Reaction> {
  @Field((type) => Int)
  @ApiProperty()
  totalCount: number;

  @Field((type) => [ReactionsEdge])
  @ApiProperty({ type: () => [ReactionsEdge] })
  edges: ReactionsEdge[];

  @Field((type) => PageInfo)
  @ApiProperty({ type: () => PageInfo })
  pageInfo: PageInfo;

  constructor(input: Partial<ReactionsPage> = {}) {
    Object.assign(this, input);
  }

  public static pageGen = GenericPageGen(
    ReactionsPage,
    ReactionsEdge,
    (x: Reaction) => btoa(`reaction-${x.authorId}-${x.postId}`)
  );
}
