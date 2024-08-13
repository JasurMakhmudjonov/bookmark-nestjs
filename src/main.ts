import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './app';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = app.get<ConfigService>(ConfigService);

  app.use(
    '/api/docs',
    basicAuth({
      challenge: true,
      users: { admin: '123' },
    }),
  );

  app.enableVersioning();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo')
    .setDescription('This API demonstrates todos endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes();

  await app.listen(config.get('PORT'), () => {
    console.log(`Server: http://localhost:${config.get('PORT')}`);
    console.log(`Docs: http://localhost:${config.get('PORT')}/api/docs`);
  });
}
bootstrap();
