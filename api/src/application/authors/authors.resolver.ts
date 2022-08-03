import {
  Int,
  Parent,
  Args,
  Resolver,
  Query,
  ResolveField,
  Mutation,
} from "@nestjs/graphql";
import { Post } from "src/application/posts/models/post.model";
import { PostsService } from "../posts/posts.service";
import { AuthService } from "../auth/auth.service";
import { AuthorsService } from "./authors.service";
import { Author } from "./models/author.model";

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  @Query((returns) => Author, { name: "author" })
  async getAuthor(@Args("id", { type: () => Int }) id: number) {
    return await this.authorsService.findOneById(id);
  }

  @Query((returns) => Author, { name: "me" })
  async getMe() {
    return await this.authorsService.findMe();
  }

  @Mutation((returns) => String)
  async login(
    @Args({ name: "username", type: () => String }) username: string,
    @Args({ name: "password", type: () => String }) password: string
  ) {
    return await this.authService.login(username, password);
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
