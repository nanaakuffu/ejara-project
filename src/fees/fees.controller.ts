import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Fee } from '@prisma/client';
import JwtAuthGuard from './../auth/auth.guard';
import { FeeDto } from './dto/fee.dto';
import { FeeEntity } from './entities/fee.entity';
import { FeeService } from './fees.service';

@Controller('fees')
@UseGuards(JwtAuthGuard)
@ApiTags('fees')
@ApiBearerAuth()
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Get('latest')
  @ApiOkResponse({ type: FeeEntity })
  async getLatestTransactions(): Promise<FeeDto> {
    return this.feeService.getLatestTransactions();
  }

  @Get(':block_number')
  @ApiOkResponse({ type: FeeEntity })
  async getTransactionsByBlockNumber(
    @Param('block_number') block_number: string,
  ): Promise<Fee> {
    return this.feeService.getTransactionByBlockId(block_number);
  }
}
