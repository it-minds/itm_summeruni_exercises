import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { AuthGuard } from "./infrastructure/auth/auth.guard";
import { IHttpSessionService } from "./application/common/interfaces/auth/httpsession.interface";
import { SeedService } from "./infrastructure/persistance/seed.service";
import { IndexModule } from "./web/index.module";
import {
  getSwaggerDocumentConfig,
  swaggerDocumentOptions,
  swaggerOptions,
} from "./web/swagger";

async function bootstrap() {
  const app = await NestFactory.create(IndexModule);

  app.enableCors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  });

  const seeder = app.get(SeedService);
  await seeder.seed();

  const document = SwaggerModule.createDocument(
    app,
    getSwaggerDocumentConfig(),
    swaggerDocumentOptions
  );
  SwaggerModule.setup("swagger", app, document, swaggerOptions);

  const reflector = app.get(Reflector);
  const httpSessionService: IHttpSessionService = await app.resolve(
    "IHttpSessionService"
  );

  app.useGlobalGuards(new AuthGuard(httpSessionService, reflector));

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
