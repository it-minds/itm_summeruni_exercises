import { Inject, Injectable } from "@nestjs/common";
import { PostEntity } from "src/domain/post.entity";
import { ReactionEntity, ReactionType } from "src/domain/reaction.entity";
import { Author } from "../authors/models/author.model";
import { IApplicationContext } from "../common/interfaces/applicationcontext.interface";
import { ICurrentUserService } from "../common/interfaces/auth/currentuser.interface";
import { NewPost } from "./models/post.input";
import { Post } from "./models/post.model";
import { Reaction } from "./models/reaction.model";

@Injectable()
export class PostsService {
  constructor(
    @Inject("IApplicationContext")
    private applicationContext: IApplicationContext,
    @Inject("ICurrentUserService")
    private currentUserService: ICurrentUserService
  ) {}

  private map(post: PostEntity) {
    return new Post({
      id: post.id,
      text: post.text,
      timestamp: post.timestamp,
      relyId: post.replyId,
      repostId: post.repostId,
    });
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.applicationContext.posts.queryForMany({
      replyId: null,
    });

    return posts.map(this.map);
  }

  async findAuthorsPosts(query: { authorId?: number } = {}): Promise<Post[]> {
    const posts = await this.applicationContext.posts.queryForMany({
      replyId: null,
      authorId: query.authorId ?? -1,
    });

    return posts.map(this.map);
  }

  async findOneById(id: number): Promise<Post> {
    const post = await this.applicationContext.posts.getById(id);

    if (!post) {
      throw new Error("404 - not found");
    }

    return this.map(post);
  }

  async findPostReplies(query: { postId?: number } = {}): Promise<Post[]> {
    const posts = await this.applicationContext.posts.queryForMany({
      replyId: query.postId ?? -1,
    });

    return posts.map(this.map);
  }

  async findPostAuthor(query: { postId?: number } = {}): Promise<Author> {
    const post = await this.applicationContext.posts.getById(
      query.postId ?? -1
    );

    if (!post) {
      throw new Error("404 - not found");
    }

    const author = await this.applicationContext.authors.getById(post.authorId);
    if (!author) {
      throw new Error("404 - not found");
    }

    const dto = new Author({
      id: author.id,
      username: author.name,
    });
    return dto;
  }

  async findPostReactions(
    query: { postId?: number } = {}
  ): Promise<Reaction[]> {
    const reactions = await this.applicationContext.reactions.queryForMany({
      postId: query.postId ?? -1,
    });

    return reactions.map(
      (post) =>
        new Reaction({
          authorId: post.authorId,
          postId: post.postId,
          reaction: post.reaction,
        })
    );
  }

  async createPost(
    post: Partial<Pick<PostEntity, "text" | "replyId" | "repostId">>
  ): Promise<Post> {
    const newPost = new PostEntity({
      authorId: this.currentUserService.getUserId(),
      timestamp: Date.now(),
      ...post,
    });

    this.applicationContext.posts.add(newPost);

    await this.applicationContext.posts.saveChanges();

    return this.map(newPost);
  }

  async createReply(replyId: number, { text }: NewPost): Promise<Post> {
    return await this.createPost({ text, replyId });
  }

  async createRepost(repostId: number, { text }: NewPost): Promise<Post> {
    return await this.createPost({ text, repostId });
  }

  async createReaction(
    postId: number,
    reaction: ReactionType
  ): Promise<Reaction> {
    let existing = await this.applicationContext.reactions.queryForFirst({
      authorId: this.currentUserService.getUserId(),
      postId,
    });

    if (existing) {
      existing.reaction = reaction;
      this.applicationContext.reactions.update(existing);
    } else {
      existing = new ReactionEntity({
        authorId: this.currentUserService.getUserId(),
        postId,
        reaction,
      });
      this.applicationContext.reactions.add(existing);
    }

    await this.applicationContext.reactions.saveChanges();

    return new Reaction({
      authorId: existing.authorId,
      postId: existing.postId,
      reaction: existing.reaction,
    });
  }

  async delete(postId: number): Promise<void> {
    const existing = await this.applicationContext.posts.getById(postId);

    if (!existing) {
      throw new Error("404 - not found");
    }

    const toDelete = this.applicationContext.posts.delete({
      id: postId,
    } as PostEntity);
    await this.applicationContext.posts.saveChanges();
  }
}
