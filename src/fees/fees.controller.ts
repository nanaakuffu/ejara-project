import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Fee } from '@prisma/client';
import JwtAuthGuard from './../auth/auth.guard';
import { FeeEntity } from './entities/fee.entity';
import { FeeService } from './fees.service';

@Controller('fees')
@UseGuards(JwtAuthGuard)
@ApiTags('fees')
@ApiBearerAuth()
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  // @Get('latest_block')
  // async getLatestBlock(): Promise<string> {
  //   return this.feeService.getlatestBlock();
  // }

  // @Get('transactions')
  // async getTransactions(): Promise<number[]> {
  //   return this.feeService.getTransactions();
  // }

  @Get('latest')
  @ApiOkResponse({ type: FeeEntity })
  async getLatestTransactions(): Promise<{
    id: number;
    block_number: string;
    min: number;
    max: number;
    average: number;
    median: number;
  }> {
    return this.feeService.getLatestTransactions();
  }

  @Get(':block_number')
  @ApiOkResponse({ type: FeeEntity })
  async getTransactionsByBlockNumber(
    @Param('block_number') params,
  ): Promise<Fee> {
    return this.feeService.getTransactionByBlockId(params.block_number);
  }
}
