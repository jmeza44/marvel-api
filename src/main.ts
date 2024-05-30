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

  // await app.listen(process.env.PORT || 3000, , () => );
  const port = process.env.PORT || 3000;
  console.log(`Port ${port}`);
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on Port ${port}`);
  });
}

bootstrap();
