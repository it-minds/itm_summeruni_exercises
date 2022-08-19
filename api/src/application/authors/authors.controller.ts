import { Body, Controller, DefaultValuePipe, Get, Param, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiResponse } from "@nestjs/swagger";
import { Public } from "../auth/public.decorator";
import { PostsService } from "../posts";
import { PostsPage } from "../posts/models/post.page.model";
import { AuthorsService } from "./authors.service";
import { NewAuthor } from "./models/author.input";
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
  @ApiResponse({ type: AuthorsPage })
  async getAuthors(
    @Query("first") first: number,
    @Query("after", new DefaultValuePipe(""))
    after?: string
  ): Promise<AuthorsPage> {
    const all = await this.authorsService.findAll();
    return AuthorsPage.pageGen(all, +first, after);
  }

  @Get(":id")
  @ApiResponse({ type: Author })
  async getAuthor(@Param("id") id: number): Promise<Author> {
    return await this.authorsService.findOneById(+id);
  }

  @Get(":id/posts")
  @ApiResponse({ type: PostsPage })
  async getAuthorPosts(
    @Param("id") id: number,
    @Query("first") first: number,
    @Query("after", new DefaultValuePipe("")) after?: string
  ): Promise<PostsPage> {
    const all = await this.postsService.findAuthorsPosts({
      authorId: +id,
    });

    return PostsPage.pageGen(all, +first, after);
  }

  @Public()
  @Post()
  @ApiResponse({ type: Author })
  async createAuthor(@Body() newAuthor: NewAuthor): Promise<Author> {
    return await this.authorsService.createAuthor(newAuthor);
  }
}
