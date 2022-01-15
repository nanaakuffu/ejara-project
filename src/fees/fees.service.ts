import { Injectable } from '@nestjs/common';
import DBService from 'src/db/db.service';
import { Fee } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { max, mean, median, min } from 'simple-statistics';

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
      // map((d) => d.contents),
      // map((arrayData) =>
      //   arrayData.map((element) => element.map((data) => data.contents)),
      // ),
      // map((d) =>
      //   d.map((e) =>
      //     e.map(
      //       (k) => k.filter((m) => m.kind === 'transaction'), //.map((f) => f.fee),
      //       // .map((l) => l)
      //       // .forEach((element) => {
      //       //   feeArray.push(element);
      //       // }),
      //       // .reduce((t, v) => {
      //       //   return t + parseInt(v);
      //       // }, 0)
      //       // .map((f) => feeArray.push(f)),
      //     ),
      //   ),
      // ),
      // map((f) => f),
      // map((arrayData) =>
      //   arrayData.map((data) => {
      //     if (data.length > 0) {
      //       data.map((res) =>
      //         res.contents.map((kindData) => console.log(kindData)),
      //       );
      //     }
      //   }),
      // ),
      // ),
    );

    return feeArray;
  }

  async getLatestTransactions(): Promise<{
    id: number;
    block_number: string;
    min: number;
    max: number;
    average: number;
    median: number;
  }> {
    const blockId = await this.getlatestBlock();
    const feeArray = await this.getTransactions(blockId);

    return {
      id: 1,
      block_number: blockId,
      min: min(feeArray),
      max: max(feeArray),
      average: mean(feeArray),
      median: median(feeArray),
    };
  }

  async getTransactionByBlockId(block_number: string): Promise<Fee | null> {
    return this.dbService.fee.findUnique({
      where: { block_number: block_number },
    });
  }
}
