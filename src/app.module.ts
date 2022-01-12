import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FeeModule } from './fees/modules/fee.module';
import LoggerMiddleware from './middlewares/logger.middleware';

@Module({
  imports: [FeeModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('fees');
  }
}
