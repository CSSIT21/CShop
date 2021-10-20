import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import express from 'express';
import { AppModule } from './app.module';

const origin = [
  `http://localhost:${process.env.SERVER_PORT || 8080}`
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  });

  // app.use(express.json());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.SERVER_PORT || 8080);
}
bootstrap();
