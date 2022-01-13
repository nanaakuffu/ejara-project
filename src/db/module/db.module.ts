// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import DBService from '../db.service';

@Global() // makes DBService globally available
@Module({
  providers: [DBService],
  exports: [DBService], // export DBService for Dependency Injection
})
export class DBModule {}
