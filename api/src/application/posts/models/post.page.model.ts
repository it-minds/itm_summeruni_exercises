import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Edge, Page } from "src/application/common/pagination/page.interface";
import { GenericPageGen } from "src/application/common/pagination/pagegen.util";
import { PageInfo } from "src/application/common/pagination/pageinfo.model";
import { Post } from "./post.model";

@ObjectType()
export class PostsEdge implements Edge<Post> {
  @Field((type) => Post)
  @ApiProperty({
    type: () => Post,
  })
  node: Post;

  @Field()
  @ApiProperty()
  cursor: string;

  constructor(input: Partial<PostsEdge> = {}) {
    Object.assign(this, input);
  }
}

@ObjectType()
export class PostsPage implements Page<Post> {
  @Field((type) => Int)
  @ApiProperty()
  totalCount: number;

  @Field((type) => [PostsEdge])
  @ApiProperty({ type: () => [PostsEdge] })
  edges: PostsEdge[];

  @Field((type) => PageInfo)
  @ApiProperty({ type: () => PageInfo })
  pageInfo: PageInfo;

  constructor(input: Partial<PostsPage> = {}) {
    Object.assign(this, input);
  }

  public static pageGen = GenericPageGen(PostsPage, PostsEdge, (x: Post) =>
    btoa(`post-${x.id}`)
  );
}
