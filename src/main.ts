import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('MIT')
    .setDescription('MIT')
    .setVersion('1.0')
    .setContact(
      'Alejandro Rodriguez',
      'https://www.linkedin.com/in/alejandro-rv02/',
      'alejandrorv944@gmail.com',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();

  const configService = app.get(ConfigService);
  await app.listen(configService.get('SERVER_PORT'));
}
bootstrap();
