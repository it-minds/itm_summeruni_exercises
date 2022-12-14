import { Inject, Injectable } from "@nestjs/common";
import { AuthorEntity } from "src/domain/author.entity";
import { CacheService } from "../cache.service";
import { EntityRepository } from "src/application/common/interfaces/applicationcontext.interface";
import { BaseCacheService } from "./basecache.service";

type Entity = AuthorEntity;

@Injectable()
export class AuthorsCacheService
  extends BaseCacheService<Entity, "id">
  implements EntityRepository<Entity, "id">
{
  constructor(@Inject(CacheService) cacheService: CacheService) {
    super(cacheService, "authors");
  }
}
