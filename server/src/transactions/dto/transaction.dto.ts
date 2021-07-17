export class Transaction {
  blockNumber: string;
  hash: string;
  from: string;
  to: string;
  value: string;
}

export class TransactionResponse {
  status: string;
  message: string;
  result: Transaction[];
}
