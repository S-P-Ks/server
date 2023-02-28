import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    methods: "GET,HEAD,PUT,POST,PATCH,DELETE,OPTIONS",
    origin: true
  })
  await app.listen(4000);
}
bootstrap();