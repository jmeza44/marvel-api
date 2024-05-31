import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await initializeNestApp();
  initializeSwagger(app);
  await startListening(app);
}

bootstrap();

async function initializeNestApp(): Promise<INestApplication<any>> {
  Logger.log('Initializing the APP', 'Application Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: new Logger('Marvel API', { timestamp: true }),
  });
  Logger.log('APP initialized', 'Application Bootstrap');
  app.enableCors({
    origin: process.env.APP_ALLOWED_ORIGIN.split(';'),
    methods: ['GET', 'PUT', 'POST'],
  });
  return app;
}

function initializeSwagger(app: INestApplication<any>) {
  Logger.log('Initializing Swagger', 'Application Bootstrap');
  const config = new DocumentBuilder()
    .setTitle('MARVEL API')
    .setDescription('Query Marvel related data')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  Logger.log('Swagger Initialized', 'Application Bootstrap');
}

async function startListening(app: INestApplication<any>) {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';

  Logger.log(
    `Trying setup HOST ${host} and PORT ${port}`,
    'Application Bootstrap',
  );
  await app.listen(port, host, () => {
    Logger.log(
      `Listening on HOST ${host} and PORT ${port}`,
      'Application Bootstrap',
    );
  });
}
