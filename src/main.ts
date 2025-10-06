import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector)
  ))
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }))
  await app.listen(+PORT);
  console.log("App running on port - ", PORT)
  // console.log('DB HOST:', process.env.DATABASE_HOST);
  // console.log('DB PORT:', process.env.DATABASE_PORT);

}
bootstrap();