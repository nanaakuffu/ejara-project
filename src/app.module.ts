import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FeeModule } from './fees/modules/fee.module';
import LoggerMiddleware from './middlewares/logger.middleware';
import { DBModule } from './db/module/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    FeeModule,
    DBModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
