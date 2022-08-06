import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PostsService } from ".";
import { PostsPage } from "./models/post.page.model";
import { AuthorsService } from "../authors/authors.service";
import { Author } from "../authors/models/author.model";
import { Post } from "./models/post.model";

@Controller("posts")
@ApiTags("posts")
@ApiBearerAuth("authorization")
export class PostsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService
  ) {}

  @Get("timeline")
  async getTimeline(
    @Query("first") first: number,
    @Query("after") after?: string
  ): Promise<PostsPage> {
    const all = await this.postsService.findAll();
    const sorted = all.sort((a, b) => b.timestamp - a.timestamp);

    return PostsPage.pageGen(sorted, first, after);
  }

  @Get(":id")
  async getPost(@Param("id") id: number): Promise<Post> {
    return await this.postsService.findOneById(id);
  }

  @Get(":id/replies")
  async getAuthorPosts(
    @Param("id") id: number,
    @Query("first") first: number,
    @Query("after") after?: string
  ): Promise<PostsPage> {
    const all = await this.postsService.findPostReplies({ postId: id });

    return PostsPage.pageGen(all, first, after);
  }

  @Get(":id/author")
  async getPostAuthor(@Param("id") id: number): Promise<Author> {
    const author = await this.postsService.findPostAuthor({ postId: id });

    return author;
  }
}
