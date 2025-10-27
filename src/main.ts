import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomWsAdapter } from './resource/chat/modules/ws.adapter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/exeption-filter';
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger'

const PORT = process.env.PORT||1234

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new CustomWsAdapter(app));
  
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

    if (process.env.ENVIRONMENT === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Hive')
      .setDescription('Hive')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(PORT);
  console.log(`App running on port ${PORT}`);
}

bootstrap();