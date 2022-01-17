import { Injectable } from '@nestjs/common';
import { Fee } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { max, mean, median, min } from 'simple-statistics';
import { FeeDto } from './dto/fee.dto';
import DBService from '../db/db.service';

@Injectable()
export class FeeService {
  /**
   *
   */
  constructor(private dbService: DBService, private httpService: HttpService) {}

  async getlatestBlock(): Promise<string> {
    return firstValueFrom(
      this.httpService
        .get('https://tez.nodes.ejaraapis.xyz/chains/main/blocks/', {
          headers: {
            Accept: 'application/json',
          },
        })
        .pipe(map((response) => response.data[0][0])),
    );
  }

  async getTransactions(blockId: string): Promise<number[]> {
    const feeArray = [];
    await firstValueFrom(
      this.httpService
        .get(`https://tez.nodes.ejaraapis.xyz/chains/main/blocks/${blockId}`, {
          headers: {
            Accept: 'application/json',
          },
        })
        .pipe(
          map((response) => response.data),
          map((responseData) => responseData.operations),
          map((data) =>
            data.map((l) =>
              l.map((e) =>
                e.contents
                  .filter((f) => f.kind === 'transaction')
                  .forEach((a) => feeArray.push(parseInt(a.fee))),
              ),
            ),
          ),
        ),
    );

    return feeArray;
  }

  async getLatestTransactions(): Promise<{
    block_number: string;
    min: number;
    max: number;
    average: number;
    median: number;
  }> {
    const blockId = await this.getlatestBlock();
    const feeArray = await this.getTransactions(blockId);

    const lastestFee: FeeDto = {
      block_number: blockId,
      min: min(feeArray),
      max: max(feeArray),
      average: mean(feeArray),
      median: median(feeArray),
    };

    return this.upsertLatestBlockChain(lastestFee);
  }

  async getTransactionByBlockId(block_number: string): Promise<Fee | null> {
    return this.dbService.fee.findUnique({
      where: { block_number: block_number },
    });
  }

  async upsertLatestBlockChain(feeDto: FeeDto): Promise<FeeDto> {
    return this.dbService.fee.upsert({
      create: feeDto,
      update: feeDto,
      where: { block_number: feeDto.block_number },
    });
  }
}
