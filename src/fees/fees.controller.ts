import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Fee } from '@prisma/client';
import JwtAuthGuard from './../auth/auth.guard';
import { FeeDto } from './dto/fee.dto';
import { FeeEntity } from './entities/fee.entity';
import { FeeService } from './fees.service';

/**
 * A class to interface the fee service class for data manipulation
 */
@Controller('fees')
@UseGuards(JwtAuthGuard)
@ApiTags('fees')
@ApiBearerAuth()
export class FeeController {
  // Injecting fee service class through constructor
  constructor(private readonly feeService: FeeService) {}

  @Get('latest')
  @ApiOkResponse({ type: FeeEntity })
  async getLatestTransactions(): Promise<FeeDto> {
    // Return latest matrics of a particular block
    return this.feeService.getLatestTransactions();
  }

  @Get(':block_number')
  @ApiOkResponse({ type: FeeEntity })
  async getTransactionsByBlockNumber(
    @Param('block_number') block_number: string,
  ): Promise<Fee> {
    // Return metrics of a particular block number
    return this.feeService.getTransactionByBlockId(block_number);
  }
}
