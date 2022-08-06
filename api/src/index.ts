import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { AuthGuard } from "./infrastructure/auth/auth.guard";
import { IHttpSessionService } from "./application/common/interfaces/auth/httpsession.interface";
import { SeedService } from "./infrastructure/persistance/seed.service";
import { IndexModule } from "./web/index.module";
import { getSwaggerDocumentConfig } from "./web/swagger/document";
import { styles } from "./web/swagger/style.css";

async function bootstrap() {
  const app = await NestFactory.create(IndexModule);

  app.enableCors({
    credentials: true,
    origin: "http://localhost:3000",
  });

  const seeder = app.get(SeedService);
  await seeder.seed();

  const document = SwaggerModule.createDocument(app, getSwaggerDocumentConfig());
  SwaggerModule.setup("swagger", app, document, {
    customCss: styles,
    customSiteTitle: "SU API Swagger"
   });

  const reflector = app.get(Reflector);
  const httpSessionService: IHttpSessionService = await app.resolve("IHttpSessionService");
  
  app.useGlobalGuards(new AuthGuard(httpSessionService, reflector));

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
