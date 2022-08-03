import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SeedService } from "./infrastructure/persistance/seed.service";
import { IndexModule } from "./web/index.module";

async function bootstrap() {
  const app = await NestFactory.create(IndexModule);

  app.enableCors({
    credentials: true,
    origin: "http://localhost:3000",
  });

  const seeder = app.get(SeedService);
  await seeder.seed();

  const config = new DocumentBuilder()
    .setTitle("Summer University Twitter")
    .setDescription(
      "This API is to be used for most of the applications we are building."
    )
    .setVersion("1.0")
    // .addTag('su')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
