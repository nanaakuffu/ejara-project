import { Controller, Get, Param } from '@nestjs/common';
import { Fee } from '@prisma/client';
import { FeeService } from './fees.service';

@Controller('fees')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Get('latest')
  async getLatestTransactions(): Promise<Fee[]> {
    return this.feeService.getLatestTransactions();
  }

  @Get(':block_number')
  getTransactionsByBlockNumber(@Param() params): Promise<Fee> {
    return this.feeService.getTransactionByBlockId(params.block_number);
  }
}