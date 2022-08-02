import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { AuthorsController, AuthorsResolver, AuthorsService } from "./authors";
import { PostsService } from "./posts";

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsResolver, PostsService],
})
export class ApplicationModule {}
