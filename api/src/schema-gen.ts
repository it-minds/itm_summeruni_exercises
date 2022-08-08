import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { IndexModule } from "./web/index.module";
import {
  getSwaggerDocumentConfig,
  swaggerDocumentOptions,
  swaggerOptions,
} from "./web/swagger";
import { writeFileSync } from "fs";
import { exit } from "process";

async function bootstrap() {
  console.log("SCHEMA GENERATING...");
  const app = await NestFactory.create(IndexModule);

  const document = SwaggerModule.createDocument(
    app,
    getSwaggerDocumentConfig(),
    swaggerDocumentOptions
  );
  SwaggerModule.setup("swagger", app, document, swaggerOptions);
  writeFileSync("./swagger-spec.json", JSON.stringify(document));
  console.log("SCHEMA GENERATED!");
  exit(0);
}
bootstrap();
