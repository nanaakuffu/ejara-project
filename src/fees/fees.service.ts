import { Injectable } from '@nestjs/common';

@Injectable()
export class FeeService {
  getLatestTransactions(): string {
    return 'Hello World!';
  }

  getTransactionByBlockId(id: string): number {
    return parseInt(id);
  }
}
