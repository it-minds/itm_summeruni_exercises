import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Edge, Page } from "src/application/common/pagination/page.interface";
import { GenericPageGen } from "src/application/common/pagination/pagegen.util";
import { PageInfo } from "src/application/common/pagination/pageinfo.model";
import { Post } from "./post.model";

@ObjectType()
export class PostsEdge implements Edge<Post> {
  @Field((type) => Post)
  node: Post;

  @Field()
  cursor: string;

  constructor(input: Partial<PostsEdge> = {}) {
    Object.assign(this, input);
  }
}

@ObjectType()
export class PostsPage implements Page<Post> {
  @Field((type) => Int)
  totalCount: number;

  @Field((type) => [PostsEdge])
  edges: PostsEdge[];

  @Field((type) => PageInfo)
  pageInfo: PageInfo;

  constructor(input: Partial<PostsPage> = {}) {
    Object.assign(this, input);
  }

  public static pageGen = GenericPageGen(PostsPage, PostsEdge, (x: Post) =>
    btoa(`post-${x.id}`)
  );
}
