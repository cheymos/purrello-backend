import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swaggerConfig, swaggerModuleOptions } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;

  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, swaggerModuleOptions);

  await app.listen(PORT);
}
bootstrap();
