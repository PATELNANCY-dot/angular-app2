export interface Transaction {
  id?: number;
  investorId: number;
  transactionId: string;
  withDrawBankId: number;
  payoutType: string;
  option1: string;
  mhp: string;
  tranAmount: number;
  transactionStatus?: string;
  transactionTime?: Date;
  paymentType: string;
  paymentMode: string;
  paymentDocFile: string;
}
