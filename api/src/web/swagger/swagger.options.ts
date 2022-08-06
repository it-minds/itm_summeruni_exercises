import { SwaggerCustomOptions, SwaggerDocumentOptions } from "@nestjs/swagger";
import { styles } from "./swagger.css";

export const swaggerOptions: SwaggerCustomOptions = {
  customCss: styles,
  customSiteTitle: "SU API Swagger",
};
