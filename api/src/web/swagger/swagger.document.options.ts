import { SwaggerDocumentOptions } from "@nestjs/swagger";

export const swaggerDocumentOptions: SwaggerDocumentOptions = {
  operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
};
