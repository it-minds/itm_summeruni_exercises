import {
  Controller,
  Get,
  Param,
  Query,
  Post as HttpPost,
  Delete,
  Put,
  Body,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostsService } from ".";
import { PostsPage } from "./models/post.page.model";
import { Author } from "../authors/models/author.model";
import { Post } from "./models/post.model";
import { ReactionsPage } from "../reactions/models/reaction.page.model";
import { NewPost } from "./models/post.input";
import { ReactionInput } from "../reactions/models/reaction.input";
import { ReactionsService } from "../reactions/reactions.service";

@Controller("posts")
@ApiTags("posts")
@ApiBearerAuth("authorization")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly reactionsService: ReactionsService
  ) {}

  @Get("timeline")
  @ApiResponse({ type: PostsPage })
  async getTimeline(
    @Query("first") first: number,
    @Query("after") after?: string
  ): Promise<PostsPage> {
    const all = await this.postsService.findAll();
    const sorted = all.sort((a, b) => b.timestamp - a.timestamp);

    return PostsPage.pageGen(sorted, +first, after);
  }

  @Get(":id")
  @ApiResponse({ type: Post })
  async getPost(@Param("id") id: number): Promise<Post> {
    return await this.postsService.findOneById(+id);
  }

  @Get(":id/replies")
  @ApiResponse({ type: PostsPage })
  async getPostReplies(
    @Param("id") id: number,
    @Query("first") first: number,
    @Query("after") after?: string
  ): Promise<PostsPage> {
    const all = await this.postsService.findPostReplies({ postId: +id });

    return PostsPage.pageGen(all, +first, after);
  }

  @Get(":id/reactions")
  @ApiResponse({ type: [String] })
  async getPostReactions(
    @Param("id") id: number,
    @Query("first") first: number,
    @Query("after") after?: string
  ) {
    const all = await this.reactionsService.findPostReactions({ postId: id });

    return ReactionsPage.pageGen(all, first, after);
  }

  @Get(":id/author")
  @ApiResponse({ type: Author })
  async getPostAuthor(@Param("id") id: number): Promise<Author> {
    const author = await this.postsService.findPostAuthor({ postId: +id });
    return author;
  }

  @HttpPost()
  @ApiResponse({ type: Post })
  async createPost(@Body() { text }: NewPost) {
    return await this.postsService.createPost({ text });
  }

  @HttpPost(":id/replies")
  @ApiResponse({ type: Post })
  async createReply(@Param("id") id: number, @Body() { text }: NewPost) {
    return await this.postsService.createReply(+id, { text });
  }

  @HttpPost(":id/reposts")
  @ApiResponse({ type: Post })
  async createRepost(@Param("id") id: number, @Body() { text }: NewPost) {
    return await this.postsService.createRepost(+id, { text });
  }

  @HttpPost(":id/reactions")
  @ApiResponse({ type: Number })
  async createReaction(
    @Param("id") id: number,
    @Body() { reaction }: ReactionInput
  ) {
    return await this.reactionsService.createReaction(id, reaction);
  }

  @Put(":id/reactions")
  @ApiResponse({ type: Number })
  async updateReaction(
    @Param("id") id: number,
    @Body() { reaction }: ReactionInput
  ) {
    return await this.reactionsService.createReaction(id, reaction);
  }

  @Delete(":id")
  async deletePost(@Param("id") id: number) {
    await this.postsService.delete(id);
    return "ok";
  }
}
