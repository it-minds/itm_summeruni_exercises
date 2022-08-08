import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { AuthController, AuthResolver, AuthService } from "./auth";
import { AuthorsController, AuthorsResolver, AuthorsService } from "./authors";
import {
  PostsController,
  PostsGateway,
  PostsResolver,
  PostsService,
} from "./posts";
import { ReactionsResolver, ReactionsService } from "./reactions";

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthorsController, AuthController, PostsController],
  providers: [
    AuthorsService,
    AuthorsResolver,
    PostsService,
    PostsResolver,
    PostsGateway,
    AuthService,
    AuthResolver,
    ReactionsResolver,
    ReactionsService,
  ],
  exports: [],
})
export class ApplicationModule {}
