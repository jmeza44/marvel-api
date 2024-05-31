import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
config();

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
  const allowedOrigins = process.env.APP_ALLOWED_ORIGIN.split(';');

  configureCors(app, allowedOrigins);
  app.useGlobalPipes(new ValidationPipe());
  return app;
}

function configureCors(app: INestApplication<any>, allowedOrigins: string[]) {
  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
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
