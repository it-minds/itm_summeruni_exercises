import { Injectable, Inject } from "@nestjs/common";
import { IApplicationContext } from "src/application/common/interfaces/applicationcontext.interface";
import { AuthorsCacheService } from "./repositories/authors.cache.service";
import { PostsCacheService } from "./repositories/posts.cache.service";
import { ReactionsCacheService } from "./repositories/reactions.cache.service";

@Injectable()
export class ApplicationContext implements IApplicationContext {
  constructor(
    @Inject(AuthorsCacheService) public readonly authors: AuthorsCacheService,
    @Inject(PostsCacheService) public readonly posts: PostsCacheService,
    @Inject(ReactionsCacheService)
    public readonly reactions: ReactionsCacheService
  ) {}
}
