import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.APP_ALLOWED_ORIGIN,
      methods: ['GET', 'PUT', 'POST'],
    },
  });

  const config = new DocumentBuilder()
    .setTitle('MARVEL API')
    .setDescription('Query Marvel related data')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';

  console.log(`Trying Listening on HOST ${host} and PORT ${port}`);

  await app.listen(port, host, () => {
    console.log(`Listening on HOST ${host} and PORT ${port}`);
  });
}

bootstrap();
