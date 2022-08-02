import {
  Int,
  Parent,
  Args,
  Resolver,
  Query,
  ResolveField,
} from "@nestjs/graphql";
import { Post } from "src/application/posts/models/post.model";
import { PostsService } from "../posts/posts.service";
import { AuthorsService } from "./authors.service";
import { Author } from "./models/author.model";

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService
  ) {}

  @Query((returns) => Author, { name: "author" })
  async getAuthor(@Args("id", { type: () => Int }) id: number) {
    return await this.authorsService.findOneById(id);
  }

  // getAuthor(
  //   @Args('firstName', { nullable: true }) firstName?: string,
  //   @Args('lastName', { defaultValue: '' }) lastName?: string,
  //   @Args() args: GetAuthorArgs
  // ) {}

  @ResolveField("posts", (returns) => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
}
