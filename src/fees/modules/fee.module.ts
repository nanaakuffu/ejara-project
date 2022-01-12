import { Module } from '@nestjs/common';
import { FeeController } from './../fees.controller';
import { FeeService } from './../fees.service';

@Module({
  controllers: [FeeController],
  providers: [FeeService],
})
export class FeeModule {}
