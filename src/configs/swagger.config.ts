import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Purrello API')
  .setDescription('The Purrello API docs')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    description: 'This token is available 30 mins',
  })
  .build();

export const swaggerModuleOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Purrello API',
};
