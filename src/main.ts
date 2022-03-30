import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import DBService from './db/db.service';
import { ErrorHandlerFilter } from './filter/http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  // Enable validation pipes for all the incomming requests based on either entity or dta
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  // Enable the http exception created in the filter feature
  app.useGlobalFilters(new ErrorHandlerFilter());
  // Set a global prefix for the api
  app.setGlobalPrefix('/v1/api');

  // Confifure swagger documentation for easy testing
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

  // Making sure the dbservice closes the db on system exit
  const dbService: DBService = app.get(DBService);
  dbService.enableShutdownHooks(app);

  await app.listen(PORT);
}
bootstrap();
