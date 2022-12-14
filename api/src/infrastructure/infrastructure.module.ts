import { CacheModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
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
import { TokenService } from "./auth/token.service";
import { AuthGuard } from "./auth/auth.guard";
import { ReactionsCacheService } from "./persistance/repositories/reactions.cache.service";

@Module({
  imports: [CacheModule.register(), JwtModule.register({})],
  providers: [
    CacheService,
    AuthorsCacheService,
    PostsCacheService,
    ReactionsCacheService,
    {
      provide: "INameFakeService",
      useClass: NameFakeService,
    },
    {
      provide: "IApplicationContext",
      useClass: ApplicationContext,
    },

    AuthorsSeedService,
    PostsSeedService,
    SeedService,

    {
      provide: "ITokenService",
      useClass: TokenService,
    },
    {
      provide: "IHttpSessionService",
      useClass: HttpSessionService,
    },
    {
      provide: "ICurrentUserService",
      useClass: CurrentUserService,
    },
    {
      provide: "AuthGuard",
      useClass: AuthGuard,
    },
  ],
  exports: [
    "INameFakeService",
    "IApplicationContext",
    "ICurrentUserService",
    "ITokenService",
    "IHttpSessionService",
    "AuthGuard",
  ],
})
export class InfrastructureModule {}
