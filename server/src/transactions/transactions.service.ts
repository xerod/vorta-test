import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom, lastValueFrom, take } from 'rxjs';
import {
  Transaction,
  TransactionResponse,
} from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(private httpService: HttpService) {}

  async findOne(
    id: string,
    page?: number,
    offset?: number,
  ): Promise<Transaction[]> {
    page = page ? page : 1;
    offset = offset ? offset : 10;

    const $source = this.httpService
      .get<TransactionResponse>(`https://api.etherscan.io/api`, {
        params: {
          module: 'account',
          action: 'txlist',
          address: id,
          page: page,
          offset: offset,
          apikey: process.env.ETHERSCAN_API_KEY,
        },
      })
      .pipe(take(30));

    const response = await firstValueFrom($source);

    const status = +response.data.status;

    if (!status) {
      throw new NotFoundException();
    }

    const result = response.data.result.map((transaction) => {
      const { blockNumber, hash, from, to, value } = transaction;
      return { blockNumber, hash, from, to, value };
    });

    return result;
  }
}
