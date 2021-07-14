export class Transaction {
  constructor(
    public blockNumber: string,
    public hash: string,
    public from: string,
    public to: string,
    public value: string,
  ) {}
}

export class TransactionResponse {
  status: string;
  message: string;
  result: Transaction[];
}
