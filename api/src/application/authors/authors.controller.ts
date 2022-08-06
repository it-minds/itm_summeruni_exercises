import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PostsService } from "../posts";
import { PostsPage } from "../posts/models/post.page.model";
import { AuthorsService } from "./authors.service";
import { Author } from "./models/author.model";
import { AuthorsPage } from "./models/author.page.model";

@Controller("authors")
@ApiTags("authors")
@ApiBearerAuth("authorization")
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService
  ) {}

  @Get()
  async getAuthors(
    @Query("first") first: number,
    @Query("after") after?: string
  ): Promise<AuthorsPage> {
    const all = await this.authorsService.findAll();
    return AuthorsPage.pageGen(all, first, after);
  }

  @Get(":id")
  async getAuthor(@Param("id") id: number): Promise<Author> {
    return await this.authorsService.findOneById(id);
  }

  @Get(":id/posts")
  async getAuthorPosts(
    @Param("id") id: number,
    @Query("first") first: number,
    @Query("after") after?: string
  ): Promise<PostsPage> {
    const all = await this.postsService.findAuthorsPosts({
      authorId: Number(id),
    });

    return PostsPage.pageGen(all, first, after);
  }
}
