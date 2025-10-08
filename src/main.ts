import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
// import { RedisIoAdapter } from './resource/chat/redis';

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const redisIoAdapter = new RedisIoAdapter(app)
  // await redisIoAdapter.connectToRedis()
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector)
  ))
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }))
  // app.useWebSocketAdapter(redisIoAdapter)
  await app.listen(+PORT);
  console.log("App running on port - ", PORT)

}
bootstrap();