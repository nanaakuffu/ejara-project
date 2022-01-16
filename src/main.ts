import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import DBService from './db/db.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1/api');

  const PORT = process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('Ejara Solution')
    .setDescription('The fee API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Ejara Test')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // app.use(helmet());
  app.enableCors();

  const dbService: DBService = app.get(DBService);
  dbService.enableShutdownHooks(app);

  await app.listen(PORT);
}
bootstrap();
