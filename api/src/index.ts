import { NestFactory } from "@nestjs/core";
import { SeedService } from "./infrastructure/persistance/seed.service";
import { IndexModule } from "./web/index.module";

async function bootstrap() {
  const app = await NestFactory.create(IndexModule);

  const seeder = app.get(SeedService);
  await seeder.seed();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
