import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const getSwaggerConfig = (port: number) =>
  new DocumentBuilder()
    .setTitle('Purrello API')
    .setDescription('The Purrello API docs')
    .setVersion('1.0')
    .build();

export const swaggerModuleOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Purrello API',
};
