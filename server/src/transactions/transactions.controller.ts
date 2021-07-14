import { Controller, Get, Param, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('offset') offset?: number,
  ) {
    return this.transactionsService.findOne(id, +page, +offset);
  }
}
