import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { AuthController } from "./auth/auth.controller";
import { AuthGuard } from "../infrastructure/auth/auth.guard";
import { AuthResolver } from "./auth/auth.resolver";
import { AuthService } from "./auth/auth.service";
import { AuthorsController, AuthorsResolver, AuthorsService } from "./authors";
import { PostsService } from "./posts";

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthorsController, AuthController],
  providers: [
    AuthorsService,
    AuthorsResolver,
    PostsService,
    AuthService,
    AuthResolver,

    {
      provide: "AuthGuard",
      useClass: AuthGuard,
    },
  ],
  exports: ["AuthGuard"],
})
export class ApplicationModule {}
