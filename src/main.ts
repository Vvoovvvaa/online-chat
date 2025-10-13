import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomWsAdapter } from './modules/ws.adapter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.useWebSocketAdapter(new CustomWsAdapter(app));

  const port = 2221;
  await app.listen(port);

  console.log(`App running on port ${port}`);
}

bootstrap();