import { CacheModule, Module, Scope } from "@nestjs/common";
import { NameFakeService } from "./external/namefake.service";
import { AuthorsCacheService } from "./persistance/authors.cache.service";
import { CacheService } from "./persistance/cache.service";
import { PostsCacheService } from "./persistance/posts.cache.service";
import { SeedService } from "./persistance/seed.service";
import { AuthorsSeedService } from "./persistance/seeds/authors.seed.service";
import { PostsSeedService } from "./persistance/seeds/posts.seed.service";

@Module({
  imports: [CacheModule.register()],
  providers: [
    CacheService,
    { provide: "INameFakeService", useClass: NameFakeService, scope: Scope.DEFAULT }, {
      provide: "IApplicationContext_AuthorEntity",
      useClass: AuthorsCacheService
    },
    {
      provide: "IApplicationContext_PostEntity",
      useClass: PostsCacheService
    },

    
    AuthorsSeedService,
    PostsSeedService,

    SeedService
],
  exports: ["INameFakeService", "IApplicationContext_AuthorEntity", "IApplicationContext_PostEntity"],
})
export class InfrastructureModule {}
