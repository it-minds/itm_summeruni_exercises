import { Inject, Injectable } from "@nestjs/common";
import { CacheService } from "../cache.service";
import { EntityRepository } from "src/application/common/interfaces/applicationcontext.interface";
import { PostEntity } from "src/domain/post.entity";
import { BaseCacheService } from "./basecache.service";

type Entity = PostEntity;

@Injectable()
export class PostsCacheService
  extends BaseCacheService<Entity, "id">
  implements EntityRepository<Entity, "id">
{
  constructor(@Inject(CacheService) cacheService: CacheService) {
    super(cacheService, "posts");
  }
}
