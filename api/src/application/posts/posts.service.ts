import { Inject, Injectable } from "@nestjs/common";
import { PostEntity } from "src/domain/post.entity";
import {
  EntityRepository,
  IApplicationContext,
} from "../common/interfaces/applicationcontext.interface";
import { Post } from "./models/post.model";

@Injectable()
export class PostsService {
  constructor(
    @Inject("IApplicationContext")
    private applicationContext: IApplicationContext
  ) {}

  async findAll(query: { authorId?: number } = {}): Promise<Post[]> {
    const posts = await this.applicationContext.posts.queryForMany({
      authorId: query.authorId ?? -1,
    });

    return posts.map(
      (post) =>
        new Post({
          id: post.id,
          text: post.text,
          timestamp: post.timestamp,
        })
    );
  }
}
