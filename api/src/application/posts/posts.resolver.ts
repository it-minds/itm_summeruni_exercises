import {
  Int,
  Parent,
  Args,
  Resolver,
  Query,
  ResolveField,
  Mutation,
  ComplexityEstimatorArgs,
} from "@nestjs/graphql";
import { PostsService } from "./posts.service";
import { PostsPage } from "./models/post.page.model";
import { Post } from "./models/post.model";
import { ReactionsPage } from "../reactions/models/reaction.page.model";
import { NewPost } from "./models/post.input";
import { ReactionInput } from "../reactions/models/reaction.input";
import { Author } from "../authors/models/author.model";
import { Reaction } from "../reactions/models/reaction.model";
import { ReactionsService } from "../reactions/reactions.service";

@Resolver((of) => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly reactionsService: ReactionsService
  ) {}

  @Query((returns) => PostsPage, {
    name: "posts",
    complexity: (options: ComplexityEstimatorArgs) =>
      options.args.first * options.childComplexity,
  })
  async getPosts(
    @Args("first", { type: () => Int, defaultValue: 20 }) first: number,
    @Args("after", { type: () => String, nullable: true }) after: string
  ) {
    const all = await this.postsService.findAll();
    const sorted = all.sort((a, b) => b.timestamp - a.timestamp);

    return PostsPage.pageGen(sorted, first, after);
  }

  @Query((returns) => Post, { name: "post" })
  async getPost(@Args("id", { type: () => Int }) id: number) {
    return await this.postsService.findOneById(id);
  }

  @ResolveField("reactions", (returns) => ReactionsPage, {
    complexity: (options: ComplexityEstimatorArgs) =>
      options.args.first * options.childComplexity,
  })
  async getReactions(
    @Parent() post: Post,
    @Args("first", { type: () => Int, defaultValue: 20 }) first: number,
    @Args("after", { type: () => String, nullable: true }) after: string
  ) {
    const { id } = post;
    const all = await this.reactionsService.findPostReactions({ postId: +id });

    return ReactionsPage.pageGen(all, first, after);
  }

  @ResolveField("replies", (returns) => PostsPage, {
    complexity: (options: ComplexityEstimatorArgs) =>
      options.args.first * options.childComplexity,
  })
  async getReplies(
    @Parent() post: Post,
    @Args("first", { type: () => Int, defaultValue: 20 }) first: number,
    @Args("after", { type: () => String, nullable: true }) after: string
  ) {
    const { id } = post;
    const all = await this.postsService.findPostReplies({ postId: +id });

    return PostsPage.pageGen(all, first, after);
  }

  @ResolveField("author", (returns) => Author)
  async getAuhtor(@Parent() post: Post) {
    const { id } = post;
    const author = await this.postsService.findPostAuthor({ postId: +id });

    return author;
  }

  @ResolveField("reply", (returns) => Post, { nullable: true })
  async getReply(@Parent() post: Post) {
    const { relyId } = post;
    if (!relyId) return null;

    const reply = await this.postsService.findOneById(relyId);

    return reply;
  }

  @ResolveField("repost", (returns) => Post, { nullable: true })
  async getRepost(@Parent() post: Post) {
    const { repostId } = post;
    if (!repostId) return null;

    const repost = await this.postsService.findOneById(repostId);

    return repost;
  }

  @Mutation((returns) => Post)
  async newPost(@Args("post") { text }: NewPost) {
    return await this.postsService.createPost({ text });
  }

  @Mutation((returns) => Post)
  async reply(@Args("postId") postId: number, @Args("post") { text }: NewPost) {
    return await this.postsService.createReply(+postId, { text });
  }

  @Mutation((returns) => Post)
  async repost(
    @Args("postId") postId: number,
    @Args("post") { text }: NewPost
  ) {
    return await this.postsService.createRepost(+postId, { text });
  }

  @Mutation((returns) => Reaction)
  async react(
    @Args("postId") postId: number,
    @Args("reaction") { reaction }: ReactionInput
  ) {
    return await this.reactionsService.createReaction(postId, reaction);
  }

  @Mutation((returns) => String)
  async deletePost(@Args("postId") postId: number) {
    await this.postsService.delete(postId);
    return "ok";
  }
}
