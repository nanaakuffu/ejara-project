import { Controller, Get, Param } from '@nestjs/common';
import { FeeService } from './fees.service';

@Controller('fees')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Get('latest')
  getLatestTransactions(): string {
    return this.feeService.getLatestTransactions();
  }

  @Get(':block_number')
  getTransactionsByBlockNumber(@Param() params): number {
    return this.feeService.getTransactionByBlockId(params.block_number);
  }
}
