import { Inject, Injectable } from "@nestjs/common";
import { INameFakeService } from "src/application/common/interfaces/namefake.interface";
import { AuthorEntity } from "src/domain/author.entity";
import { PostEntity } from "src/domain/post.entity";
import { CacheService } from "../cache.service";

@Injectable()
export class PostsSeedService {
  constructor(@Inject(CacheService) private cacheService: CacheService) {}

  private readonly key = "posts";

  async seed() {
    const posts: PostEntity[] = [];

    let count = 0;
    for (let authorId = 1; authorId <= 20; authorId++) {
      const randomPostCount = Math.floor(Math.random() * 10);

      for (let postCount = 0; postCount <= randomPostCount; postCount++) {
        const replyId = Math.floor(Math.random() * 100);

        const post = new PostEntity({
          id: count++,
          authorId,
          replyId: replyId < 50 ? replyId : null,
          text: "test",
          timestamp: Date.now(),
        });
        posts.push(post);
      }
    }

    await this.cacheService.set(this.key, JSON.stringify(posts));
  }
}
