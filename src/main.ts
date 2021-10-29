import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';
import { swaggerConfig, swaggerModuleOptions } from './configs/swagger.config';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const PORT = 3000;

  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'static'));

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, swaggerModuleOptions);

  await app.listen(PORT);
}
bootstrap();
