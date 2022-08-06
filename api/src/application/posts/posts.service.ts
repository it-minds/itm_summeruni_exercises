import { Inject, Injectable } from "@nestjs/common";
import { Author } from "../authors/models/author.model";
import { IApplicationContext } from "../common/interfaces/applicationcontext.interface";
import { Post } from "./models/post.model";

@Injectable()
export class PostsService {
  constructor(
    @Inject("IApplicationContext")
    private applicationContext: IApplicationContext
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.applicationContext.posts.queryForMany({
      replyId: null,
    });

    return posts.map(
      (post) =>
        new Post({
          id: post.id,
          text: post.text,
          timestamp: post.timestamp,
          relyId: post.replyId,
        })
    );
  }

  async findAuthorsPosts(query: { authorId?: number } = {}): Promise<Post[]> {
    const posts = await this.applicationContext.posts.queryForMany({
      replyId: null,
      authorId: query.authorId ?? -1,
    });

    return posts.map(
      (post) =>
        new Post({
          id: post.id,
          text: post.text,
          timestamp: post.timestamp,
          relyId: post.replyId,
        })
    );
  }

  async findOneById(id: number): Promise<Post> {
    const post = await this.applicationContext.posts.getById(id);

    if (!post) {
      throw new Error("404 - not found");
    }

    const dto = new Post({
      id: post.id,
      text: post.text,
      timestamp: post.timestamp,
      relyId: post.replyId,
    });

    return dto;
  }

  async findPostReplies(query: { postId?: number } = {}): Promise<Post[]> {
    const posts = await this.applicationContext.posts.queryForMany({
      replyId: query.postId ?? -1,
    });

    return posts.map(
      (post) =>
        new Post({
          id: post.id,
          text: post.text,
          timestamp: post.timestamp,
          relyId: post.replyId,
        })
    );
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
}
