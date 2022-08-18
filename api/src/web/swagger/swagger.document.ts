import { DocumentBuilder } from "@nestjs/swagger";

export const getSwaggerDocumentConfig = () => {
  const config = new DocumentBuilder()
    .setTitle("Summer University Twutter API")
    .setDescription(
      "This API is to be used for most of the applications we are building."
    )
    .setVersion("1.0")
    .addTag("auth", "Authentication")
    .addTag("authors")
    .addTag("posts")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT", in: "header" },
      "authorization"
    )
    .build();
  return config;
};
