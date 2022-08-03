import { CacheModule, Module } from "@nestjs/common";
import { NameFakeService } from "./external/namefake.service";
import { AuthorsCacheService } from "./persistance/repositories/authors.cache.service";
import { CacheService } from "./persistance/cache.service";
import { PostsCacheService } from "./persistance/repositories/posts.cache.service";
import { SeedService } from "./persistance/seed.service";
import { AuthorsSeedService } from "./persistance/seeds/authors.seed.service";
import { PostsSeedService } from "./persistance/seeds/posts.seed.service";
import { ApplicationContext } from "./persistance/applicationcontext.service";
import { CurrentUserService } from "./auth/currentuser.service";
import { HttpSessionService } from "./auth/httpsession.service";

@Module({
  imports: [CacheModule.register()],
  providers: [
    CacheService,
    AuthorsCacheService,
    PostsCacheService,
    { 
      provide: "INameFakeService",
      useClass: NameFakeService
    },
    {
      provide: "IApplicationContext",
      useClass: ApplicationContext
    },
    
    AuthorsSeedService,
    PostsSeedService,
    SeedService,

    HttpSessionService,
    {
      provide: "ICurrentUserService",
      useClass: CurrentUserService
    },
    

],
  exports: ["INameFakeService", "IApplicationContext", "ICurrentUserService"],
})
export class InfrastructureModule {}
