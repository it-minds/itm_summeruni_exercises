import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { AuthController, AuthResolver, AuthService } from "./auth";
import { AuthorsController, AuthorsResolver, AuthorsService } from "./authors";
import { PostsController, PostsResolver, PostsService } from "./posts";

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthorsController, AuthController, PostsController],
  providers: [
    AuthorsService,
    AuthorsResolver,
    PostsService,
    PostsResolver,
    AuthService,
    AuthResolver,
  ],
  exports: [],
})
export class ApplicationModule {}
