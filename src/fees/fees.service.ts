import { Injectable } from '@nestjs/common';
import DBService from 'src/db/db.service';
import { Fee } from '@prisma/client';

@Injectable()
export class FeeService {
  /**
   *
   */
  constructor(private dbService: DBService) {}

  async getLatestTransactions(): Promise<Fee[]> {
    return this.dbService.fee.findMany();
  }

  async getTransactionByBlockId(block_number: string): Promise<Fee | null> {
    return this.dbService.fee.findUnique({
      where: { block_number: block_number },
    });
  }
}
