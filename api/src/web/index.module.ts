import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { IndexController } from "./index.controller";
import { IndexService } from "./index.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { ApplicationModule } from "src/application/application.module";
import { ConfigModule } from "@nestjs/config";
import { HttpSessionMiddleware } from "src/infrastructure/auth/httpsessionintercept.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env.development.local',
        '.env.development',
        '.env.production.local',
        '.env.production',
        '.env.local',
        '.env'
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [ApplicationModule],
      autoSchemaFile: true,
      driver: ApolloDriver,
      debug: true,
      playground: true,
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    }),
    InfrastructureModule,
    ApplicationModule,
  ],
  controllers: [IndexController],
  providers: [IndexService],
})
export class IndexModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpSessionMiddleware).forRoutes("*")
  }
}
