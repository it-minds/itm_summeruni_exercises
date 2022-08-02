import { Inject, Injectable } from "@nestjs/common";
import { INameFakeService } from "src/application/common/services/namefake.interface";
import { AuthorEntity } from "src/domain/author.entity";
import { CacheService } from "../cache.service";

@Injectable()
export class AuthorsSeedService {
  constructor(
    @Inject("INameFakeService") private nameFakeService: INameFakeService,
    @Inject(CacheService) private cacheService: CacheService
  ) {}

  private readonly key = "authors";

  async seed() {

    const authors: AuthorEntity[] = []

    for (let index = 0; index < 20; index++) {
      const namefake = await this.nameFakeService.getRandomNameFake();
      const author = new AuthorEntity({
        id: index,
        firstName: namefake.name.split(" ")[0],
        lastName: namefake.name.split(" ")[1],
      });
      authors.push(author)
    }
    
    await this.cacheService.set(this.key, JSON.stringify(authors));
  }
}