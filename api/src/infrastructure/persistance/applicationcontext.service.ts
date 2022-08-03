import { Injectable, Inject } from "@nestjs/common";
import { IApplicationContext } from "src/application/common/interfaces/applicationcontext.interface";
import { AuthorsCacheService } from "./repositories/authors.cache.service";
import { PostsCacheService } from "./repositories/posts.cache.service";

@Injectable()
export class ApplicationContext implements IApplicationContext {
  constructor(
    @Inject(AuthorsCacheService)
    private authorsCacheService: AuthorsCacheService,
    @Inject(PostsCacheService) private postsCacheService: PostsCacheService
  ) {}

  public authors = this.authorsCacheService;
  public posts = this.postsCacheService;
}
