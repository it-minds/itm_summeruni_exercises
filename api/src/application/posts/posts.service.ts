import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PostEntity } from "src/domain/post.entity";
import { Author } from "../authors/models/author.model";
import { IApplicationContext } from "../common/interfaces/applicationcontext.interface";
import { ICurrentUserService } from "../common/interfaces/auth/currentuser.interface";
import { NewPost } from "./models/post.input";
import { Post } from "./models/post.model";
import { PostsGateway } from "./posts.gateway";

@Injectable()
export class PostsService {
  constructor(
    @Inject("IApplicationContext")
    private applicationContext: IApplicationContext,
    @Inject("ICurrentUserService")
    private currentUserService: ICurrentUserService,
    private readonly postsGateway: PostsGateway
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
      throw new NotFoundException("post not found");
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
      throw new NotFoundException("post not found");
    }

    const author = await this.applicationContext.authors.getById(post.authorId);
    if (!author) {
      throw new NotFoundException("author not found");
    }

    const dto = new Author({
      id: author.id,
      username: author.name,
    });
    return dto;
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

    const dto = this.map(newPost);
    this.postsGateway.server.emit("createPost", dto);
    return dto;
  }

  async createReply(replyId: number, { text }: NewPost): Promise<Post> {
    const dto = await this.createPost({ text, replyId });
    this.postsGateway.server.emit("createReply", dto);
    return dto;
  }

  async createRepost(repostId: number, { text }: NewPost): Promise<Post> {
    const dto = await this.createPost({ text, repostId });
    this.postsGateway.server.emit("createRepost", dto);
    return dto;
  }

  async delete(postId: number): Promise<void> {
    const existing = await this.applicationContext.posts.getById(postId);

    if (!existing) {
      throw new NotFoundException("post not found");
    }

    if (existing.authorId !== this.currentUserService.getUserId()) {
      throw new ForbiddenException("you are not the author of this post");
    }

    const toDelete = this.applicationContext.posts.delete({
      id: postId,
    } as PostEntity);
    await this.applicationContext.posts.saveChanges();

    this.postsGateway.server.emit("deletePost", postId);
  }
}
