import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import DBService from './db/db.service';
import { ErrorHandlerFilter } from './filter/error-handler.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.useGlobalFilters(new ErrorHandlerFilter());
  app.setGlobalPrefix('/v1/api');

  const config = new DocumentBuilder()
    .setTitle('Ejara Solution')
    .setDescription('The fee API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Ejara Test')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api/docs', app, document);

  // app.use(helmet());
  app.enableCors();

  const dbService: DBService = app.get(DBService);
  dbService.enableShutdownHooks(app);

  await app.listen(PORT);
}
bootstrap();
