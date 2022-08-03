import {
  Int,
  Parent,
  Args,
  Resolver,
  Query,
  ResolveField,
  Root,
} from "@nestjs/graphql";
import { PostsService } from "../posts/posts.service";
import { AuthorsService } from "./authors.service";
import { Author } from "./models/author.model";
import { AuthorsPage } from "./models/author.page.model";
import { PostsPage } from "../posts/models/post.page.model";

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService
  ) {}

  @Query((returns) => AuthorsPage, { name: "authors" })
  async getAuthors(
    @Args("first", { type: () => Int, defaultValue: 20 }) first: number,
    @Args("after", { type: () => String, nullable: true }) after: string
  ) {
    const all = await this.authorsService.findAll();

    return AuthorsPage.pageGen(all, first, after);
  }

  @Query((returns) => Author, { name: "author" })
  async getAuthor(@Args("id", { type: () => Int }) id: number) {
    return await this.authorsService.findOneById(id);
  }

  @ResolveField("posts", (returns) => PostsPage)
  async getPosts(
    @Root() root: unknown,
    @Parent() author: Author,
    @Args("first", { type: () => Int, defaultValue: 20 }) first: number,
    @Args("after", { type: () => String, nullable: true }) after: string
  ) {
    console.log(root);

    const { id } = author;
    const all = await this.postsService.findAll({ authorId: id });

    return PostsPage.pageGen(all, first, after);
  }
}
