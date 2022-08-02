import { Inject, Injectable } from "@nestjs/common";
import { PostEntity } from "src/domain/post.entity";
import { IApplicationContext } from "../common/services/applicationcontext.interface";
import { Post } from "./models/post.model";

@Injectable()
export class PostsService {

  constructor(
    @Inject("IApplicationContext_PostEntity") private applicationContextPostEntity: IApplicationContext<PostEntity>
  ) {}

  async findAll(query: { authorId?: number } = {}): Promise<Post[]> {

    const posts = await this.applicationContextPostEntity.queryForMany({
      authorId: query.authorId ?? -1
    })

    return posts.map(post => new Post({
        id: post.id,
        text: post.text,
        timestamp: post.timestamp
      }));
  }
}
