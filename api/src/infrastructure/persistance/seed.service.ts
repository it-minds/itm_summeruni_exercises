import { Inject, Injectable } from "@nestjs/common";
import { AuthorsSeedService } from "./seeds/authors.seed.service";
import { PostsSeedService } from "./seeds/posts.seed.service";

@Injectable()
export class SeedService {
  constructor(
    @Inject(AuthorsSeedService) private authorsSeedService: AuthorsSeedService,
    @Inject(PostsSeedService) private postsSeedService: PostsSeedService
  ) {}

  async seed() {
    this.authorsSeedService.seed();
    this.postsSeedService.seed();
  }
}
