import { Inject, Injectable } from "@nestjs/common";
import { CacheService } from "../cache.service";
import { EntityRepository } from "src/application/common/interfaces/applicationcontext.interface";
import { BaseCacheService } from "./basecache.service";
import { ReactionEntity } from "src/domain/reaction.entity";

type Entity = ReactionEntity;

@Injectable()
export class ReactionsCacheService
  extends BaseCacheService<Entity, "id">
  implements EntityRepository<Entity, "id">
{
  constructor(@Inject(CacheService) cacheService: CacheService) {
    super(cacheService, "reactions");
  }
}
