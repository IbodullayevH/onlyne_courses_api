import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from "cookie-parser"
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          return {
            property: error.property,
            constraints: error.constraints,
          };
        });
        return new BadRequestException(messages);
      }
    })
  )

  const configCervice = app.get(ConfigService)
  const port = configCervice.get<number>('SERVER_PORT') || 3001
  await app.listen(port, () => {
    console.log(`Server is run 🔥`)
  });
}
bootstrap();
