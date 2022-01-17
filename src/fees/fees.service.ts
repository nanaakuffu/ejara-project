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
   * Inject db service for communicating with db
   * Inject http service to get data from external source
   */
  constructor(private dbService: DBService, private httpService: HttpService) {}

  // Get the latest block chain id
  async getlatestBlock(): Promise<string> {
    // Used firstValuefrom to return a promise instead of an observable
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

  // Get transactions based on latest block id
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
                  .filter((content) => content.kind === 'transaction')
                  .forEach((item) => feeArray.push(parseInt(item.fee))),
              ),
            ),
          ),
        ),
    );

    // Return a promise array of numbers
    return feeArray;
  }

  // Get the lates transactions based in the latest block id
  async getLatestTransactions(): Promise<{
    block_number: string;
    min: number;
    max: number;
    average: number;
    median: number;
  }> {
    // Get the latest block
    const blockId = await this.getlatestBlock();
    // Get the latest transaction by the latest block
    const feeArray = await this.getTransactions(blockId);

    // Calculate the metrics on what is returned
    const lastestFee: FeeDto = {
      block_number: blockId,
      min: min(feeArray),
      max: max(feeArray),
      average: mean(feeArray),
      median: median(feeArray),
    };

    // Save the latest metric to the db
    return this.upsertLatestBlockChain(lastestFee);
  }

  // Get the transaction by the block id.
  // This is loaded from db
  async getTransactionByBlockId(block_number: string): Promise<Fee | null> {
    return this.dbService.fee.findUnique({
      where: { block_number: block_number },
    });
  }

  // Persist fee data metric to db by upserting.
  // If block id exists in db then update data else create the data
  async upsertLatestBlockChain(feeDto: FeeDto): Promise<FeeDto> {
    return this.dbService.fee.upsert({
      create: feeDto,
      update: feeDto,
      where: { block_number: feeDto.block_number },
    });
  }
}
